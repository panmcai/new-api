/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import React, { useEffect, useState, useMemo } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Spin, Typography } from '@douyinfe/semi-ui';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import { showError } from '../../helpers';
import '../../components/common/markdown/markdown.css';

const { Title, Text } = Typography;

const DOC_MAP = {
  'usage-zh': { path: '/docs/USAGE_ZH.md', titleKey: '使用文档（中文）' },
  'usage-en': { path: '/docs/USAGE_EN.md', titleKey: 'Usage (EN)' },
  quick: { path: '/QUICK_START.md', titleKey: '快速入门' },
};

export default function DocsMarkdown() {
  const { t, i18n } = useTranslation();
  const { docSlug } = useParams();
  const meta = DOC_MAP[docSlug];
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);

  const docTitle = useMemo(
    () => (meta ? t(meta.titleKey) : ''),
    [meta, t],
  );

  useEffect(() => {
    if (!meta) return;
    let cancelled = false;
    document.title = `${docTitle} · ${t('文档')}`;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(meta.path, { cache: 'no-cache' });
        if (!res.ok) {
          throw new Error(String(res.status));
        }
        const text = await res.text();
        if (cancelled) return;
        setHtml(marked.parse(text));
      } catch (e) {
        if (!cancelled) {
          showError(t('加载文档失败'));
          setHtml('');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [meta, docTitle, t, i18n.language]);

  if (!meta) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className='mt-[60px] px-4 pb-16 max-w-3xl mx-auto'>
      <div className='flex flex-wrap items-center gap-3 mb-6'>
        <Link
          to='/'
          className='text-semi-color-primary hover:underline text-sm'
        >
          {t('首页')}
        </Link>
        <Text type='tertiary'>/</Text>
        <a
          href='/docs/index.html'
          className='text-semi-color-primary hover:underline text-sm'
        >
          {t('文档索引')}
        </a>
        <Text type='tertiary'>/</Text>
        <Text type='tertiary' size='small'>
          {docTitle}
        </Text>
      </div>

      <Title heading={3} className='mb-6'>
        {docTitle}
      </Title>

      {loading ? (
        <div className='flex justify-center py-24'>
          <Spin size='large' />
        </div>
      ) : (
        <div
          className='markdown-body docs-static-md'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}
