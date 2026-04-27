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

import React from 'react';
import { Banner } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';

/**
 * Shows site-configured admin contact text (from System → Personalization).
 * Renders nothing when empty.
 */
export default function AdminContactNotice({ adminContact, className }) {
  const { t } = useTranslation();
  const text = (adminContact || '').trim();
  if (!text) return null;

  return (
    <Banner
      type='info'
      fullMode={false}
      className={className}
      title={t('联系管理员')}
      description={
        <div className='text-sm whitespace-pre-wrap break-words'>{text}</div>
      }
    />
  );
}
