# PeterPanAI API 使用指南

## 📍 概述

PeterPanAI API 是一个基于 [new-api](https://github.com/Calcium-Ion/new-api) 构建的大模型网关服务，提供统一的 OpenAI 兼容接口，支持多种大模型接入。

**API 地址**: `https://api.peterpanai.com/v1`

## 🔑 快速开始

### 1. 获取 API 密钥

1. 访问管理界面: `https://api.peterpanai.com`
2. 使用用户名 `panmcai` 登录
3. 进入"令牌管理"页面
4. 创建新的 API 令牌

### 2. 基础 API 调用

#### 测试连接
```bash
curl https://api.peterpanai.com/health
```

#### 获取 API 状态
```bash
curl https://api.peterpanai.com/api/status
```

## 🤖 API 接口使用

### Chat Completions (聊天补全)

**端点**: `POST /v1/chat/completions`

#### 基础调用示例
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your API Key>" \
  -d '{
    "model": "glm-5.1",
    "messages": [
      {"role": "user", "content": "你好"}
    ],
    "temperature": 0.7,
    "max_tokens": 1000
  }' \
  "https://api.peterpanai.com/v1/chat/completions"
```

#### 流式响应
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your API Key>" \
  -H "Accept: text/event-stream" \
  -d '{
    "model": "glm-5.1",
    "messages": [
      {"role": "user", "content": "写一首关于春天的诗"}
    ],
    "stream": true
  }' \
  "https://api.peterpanai.com/v1/chat/completions"
```

### 可用模型

| 模型名称 | 提供商 | 状态 | 说明 |
|---------|--------|------|------|
| `glm-5.1` | 智谱AI | ✅ 可用 | 最新版 GLM-5.1 模型 |
| 更多模型可通过管理界面添加 | | | |

## 🛠️ 客户端接入指南

### Python 客户端

#### 安装依赖
```bash
pip install openai
```

#### 使用示例
```python
from openai import OpenAI

client = OpenAI(
    api_key="<your API Key>",
    base_url="https://api.peterpanai.com/v1"
)

# 普通调用
response = client.chat.completions.create(
    model="glm-5.1",
    messages=[
        {"role": "user", "content": "解释一下量子计算"}
    ]
)
print(response.choices[0].message.content)

# 流式调用
stream = client.chat.completions.create(
    model="glm-5.1",
    messages=[
        {"role": "user", "content": "写一个Python函数计算斐波那契数列"}
    ],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

### JavaScript/Node.js 客户端

#### 安装依赖
```bash
npm install openai
```

#### 使用示例
```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: '<your API Key>',
  baseURL: 'https://api.peterpanai.com/v1',
});

async function chat() {
  const completion = await client.chat.completions.create({
    model: 'glm-5.1',
    messages: [{ role: 'user', content: 'Hello, how are you?' }],
  });
  
  console.log(completion.choices[0].message.content);
}

// 流式响应
async function streamChat() {
  const stream = await client.chat.completions.create({
    model: 'glm-5.1',
    messages: [{ role: 'user', content: 'Tell me a story' }],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}
```

## 🤖 AI Agent 接入

### OpenClaw 配置

#### 模型配置文件
位置: `/root/.openclaw/agents/main/agent/models.json`

```json
{
  "peterpanai": {
    "baseUrl": "https://api.peterpanai.com/v1",
    "apiKey": "<your API Key>",
    "api": "openai-completions",
    "models": [
      {
        "id": "glm-5.1",
        "name": "GLM-5.1 (PeterPanAI)",
        "reasoning": true,
        "input": ["text"],
        "contextWindow": 128000,
        "maxTokens": 32000
      }
    ]
  }
}
```

#### 使用命令
```bash
# 设置默认模型
export DEFAULT_MODEL="peterpanai/glm-5.1"

# 或通过命令行指定
openclaw chat --model peterpanai/glm-5.1
```

### Claude Code 接入

#### 环境变量配置
```bash
export CLAUDE_API_KEY="<your API Key>"
export CLAUDE_BASE_URL="https://api.peterpanai.com/v1"
```

#### Claude 配置文件
```yaml
# ~/.claude/config.yaml
api_key: "<your API Key>"
base_url: "https://api.peterpanai.com/v1"
default_model: "glm-5.1"
```

### 其他 AI Agent 工具

#### Continue.dev (VS Code 扩展)
```json
{
  "models": [
    {
      "title": "PeterPanAI GLM-5.1",
      "provider": "openai",
      "model": "glm-5.1",
      "apiKey": "<your API Key>",
      "apiBase": "https://api.peterpanai.com/v1"
    }
  ]
}
```

#### Cursor IDE
在 Cursor 设置中添加:
```
API Key: <your API Key>
Base URL: https://api.peterpanai.com/v1
Model: glm-5.1
```

#### Windsurf / Bloop
```yaml
ai_provider:
  type: openai
  api_key: "<your API Key>"
  base_url: "https://api.peterpanai.com/v1"
  model: "glm-5.1"
```

## 🔧 高级配置

### 模型渠道管理

通过管理界面 (`https://api.peterpanai.com`) 可以添加更多模型渠道:

1. **智谱AI**: 支持 GLM-4, GLM-5 系列
2. **DeepSeek**: 支持 DeepSeek Chat, Coder
3. **OpenAI**: 支持 GPT-4, GPT-3.5
4. **其他**: 支持 Anthropic, Google Gemini 等

### 配额管理

每个 API 令牌都有配额限制:
- 默认配额: 100,000,000 tokens
- 使用情况可在管理界面查看
- 支持按用户设置不同配额

### 速率限制

- 默认限制: 60 请求/分钟
- 可自定义调整
- 支持 IP 白名单

## 🚀 部署信息

### 服务状态
- **域名**: `api.peterpanai.com`
- **服务器IP**: `129.211.4.171`
- **端口**: 8888 (映射到容器内 3000)
- **SSL**: 已启用 HTTPS
- **健康检查**: `https://api.peterpanai.com/health`

### 技术栈
- **后端**: new-api (Go)
- **数据库**: PostgreSQL
- **部署**: Docker + Docker Compose
- **反向代理**: Nginx/OpenResty
- **证书**: Let's Encrypt

### 监控
```bash
# 查看服务状态
docker ps | grep new-api

# 查看日志
docker logs new-api

# 查看数据库
docker exec postgres psql -U root -d new-api -c "SELECT * FROM tokens;"
```

## 🐛 故障排除

### 常见问题

#### 1. 401 未授权
```json
{"error":{"message":"无效的令牌"}}
```
**解决方案**: 检查 API 密钥是否正确，或重新生成令牌。

#### 2. 404 未找到
```json
{"error":{"message":"模型不存在"}}
```
**解决方案**: 确认模型名称正确，或在管理界面添加对应模型渠道。

#### 3. 429 请求过多
```json
{"error":{"message":"速率限制"}}
```
**解决方案**: 降低请求频率，或联系管理员调整限制。

#### 4. 502 Bad Gateway
**解决方案**: 检查 new-api 服务是否运行:
```bash
docker restart new-api
systemctl restart nginx
```

### 调试工具

#### 测试脚本
```python
#!/usr/bin/env python3
import requests
import json

def test_api():
    url = "https://api.peterpanai.com/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer <your API Key>"
    }
    data = {
        "model": "glm-5.1",
        "messages": [{"role": "user", "content": "测试 API 连接"}],
        "temperature": 0.7
    }
    
    try:
        response = requests.post(url, headers=headers, json=data, timeout=30)
        print(f"状态码: {response.status_code}")
        print(f"响应: {response.text}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"\n✅ API 工作正常")
            print(f"回复: {result['choices'][0]['message']['content']}")
        else:
            print(f"\n❌ API 错误: {response.text}")
            
    except Exception as e:
        print(f"❌ 请求失败: {e}")

if __name__ == "__main__":
    test_api()
```

## 📞 支持与联系

### 问题反馈
1. 检查服务状态: `https://api.peterpanai.com/health`
2. 查看日志: `docker logs new-api`
3. 联系管理员: 通过微信联系

### 更新维护
- **自动更新**: Docker 镜像自动拉取最新版本
- **备份**: 数据库定期备份
- **监控**: 服务健康状态监控

### 安全建议
1. 定期轮换 API 密钥
2. 使用环境变量存储密钥
3. 设置 IP 访问限制
4. 监控异常使用模式

---

## 📋 更新日志

### 2026-04-13
- ✅ 修复 Nginx 重定向配置
- ✅ 修复数据库 ServerAddress 配置
- ✅ 验证 API 调用正常
- ✅ 创建自定义使用文档
- ✅ 配置 OpenClaw 模型接入

### 2026-04-11
- 🚀 初始部署 new-api 服务
- 🔧 配置 PostgreSQL 数据库
- 🌐 设置域名和 SSL 证书
- 🔐 创建管理员账户和 API 令牌

---

**最后更新**: 2026-04-13  
**维护者**: 潘明财  
**状态**: ✅ 生产环境运行正常