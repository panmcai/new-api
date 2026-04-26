# PeterPanAI API Usage Guide

## 📍 Overview

PeterPanAI API is a large language model gateway service built on [new-api](https://github.com/Calcium-Ion/new-api), providing a unified OpenAI-compatible interface with support for multiple LLMs.

**API Endpoint**: `https://api.peterpanai.com/v1`

## 🔑 Quick Start

### 1. Get API Key

1. Access admin panel: `https://api.peterpanai.com`
2. Login with username `panmcai`
3. Go to "Token Management" page
4. Create new API token

### 2. Basic API Testing

#### Test Connection
```bash
curl https://api.peterpanai.com/health
```

#### Get API Status
```bash
curl https://api.peterpanai.com/api/status
```

## 🤖 API Usage

### Chat Completions

**Endpoint**: `POST /v1/chat/completions`

#### Basic Example
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your API Key>" \
  -d '{
    "model": "glm-5.1",
    "messages": [
      {"role": "user", "content": "Hello"}
    ],
    "temperature": 0.7,
    "max_tokens": 1000
  }' \
  "https://api.peterpanai.com/v1/chat/completions"
```

#### Streaming Response
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your API Key>" \
  -H "Accept: text/event-stream" \
  -d '{
    "model": "glm-5.1",
    "messages": [
      {"role": "user", "content": "Write a poem about spring"}
    ],
    "stream": true
  }' \
  "https://api.peterpanai.com/v1/chat/completions"
```

### Available Models

| Model Name | Provider | Status | Description |
|-----------|----------|--------|-------------|
| `glm-5.1` | Zhipu AI | ✅ Available | Latest GLM-5.1 model |
| More models can be added via admin panel | | | |

## 🛠️ Client Integration

### Python Client

#### Install Dependencies
```bash
pip install openai
```

#### Usage Example
```python
from openai import OpenAI

client = OpenAI(
    api_key="<your API Key>",
    base_url="https://api.peterpanai.com/v1"
)

# Standard call
response = client.chat.completions.create(
    model="glm-5.1",
    messages=[
        {"role": "user", "content": "Explain quantum computing"}
    ]
)
print(response.choices[0].message.content)

# Streaming call
stream = client.chat.completions.create(
    model="glm-5.1",
    messages=[
        {"role": "user", "content": "Write a Python function for Fibonacci sequence"}
    ],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

### JavaScript/Node.js Client

#### Install Dependencies
```bash
npm install openai
```

#### Usage Example
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

// Streaming response
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

## 🤖 AI Agent Integration

### OpenClaw Configuration

#### Model Config File
Location: `/root/.openclaw/agents/main/agent/models.json`

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

#### Usage Commands
```bash
# Set default model
export DEFAULT_MODEL="peterpanai/glm-5.1"

# Or specify via command line
openclaw chat --model peterpanai/glm-5.1
```

### Claude Code Integration

#### Environment Variables
```bash
export CLAUDE_API_KEY="<your API Key>"
export CLAUDE_BASE_URL="https://api.peterpanai.com/v1"
```

#### Claude Configuration File
```yaml
# ~/.claude/config.yaml
api_key: "<your API Key>"
base_url: "https://api.peterpanai.com/v1"
default_model: "glm-5.1"
```

### Other AI Agent Tools

#### Continue.dev (VS Code Extension)
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
Add to Cursor settings:
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

## 🔧 Advanced Configuration

### Model Channel Management

Add more model channels via admin panel (`https://api.peterpanai.com`):

1. **Zhipu AI**: GLM-4, GLM-5 series
2. **DeepSeek**: DeepSeek Chat, Coder
3. **OpenAI**: GPT-4, GPT-3.5
4. **Others**: Anthropic, Google Gemini, etc.

### Quota Management

Each API token has quota limits:
- Default quota: 100,000,000 tokens
- Usage visible in admin panel
- Custom quotas per user

### Rate Limiting

- Default: 60 requests/minute
- Customizable
- IP whitelist support

## 🚀 Deployment Information

### Service Status
- **Domain**: `api.peterpanai.com`
- **Server IP**: `129.211.4.171`
- **Port**: 8888 (mapped to container 3000)
- **SSL**: HTTPS enabled
- **Health Check**: `https://api.peterpanai.com/health`

### Tech Stack
- **Backend**: new-api (Go)
- **Database**: PostgreSQL
- **Deployment**: Docker + Docker Compose
- **Reverse Proxy**: Nginx/OpenResty
- **Certificates**: Let's Encrypt

### Monitoring
```bash
# Check service status
docker ps | grep new-api

# View logs
docker logs new-api

# Check database
docker exec postgres psql -U root -d new-api -c "SELECT * FROM tokens;"
```

## 🐛 Troubleshooting

### Common Issues

#### 1. 401 Unauthorized
```json
{"error":{"message":"Invalid token"}}
```
**Solution**: Check API key or regenerate token.

#### 2. 404 Not Found
```json
{"error":{"message":"Model not found"}}
```
**Solution**: Verify model name or add model channel in admin panel.

#### 3. 429 Too Many Requests
```json
{"error":{"message":"Rate limit exceeded"}}
```
**Solution**: Reduce request frequency or contact admin to adjust limits.

#### 4. 502 Bad Gateway
**Solution**: Check if new-api service is running:
```bash
docker restart new-api
systemctl restart nginx
```

### Debug Tools

#### Test Script
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
        "messages": [{"role": "user", "content": "Test API connection"}],
        "temperature": 0.7
    }
    
    try:
        response = requests.post(url, headers=headers, json=data, timeout=30)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"\n✅ API working correctly")
            print(f"Reply: {result['choices'][0]['message']['content']}")
        else:
            print(f"\n❌ API Error: {response.text}")
            
    except Exception as e:
        print(f"❌ Request failed: {e}")

if __name__ == "__main__":
    test_api()
```

## 📞 Support & Contact

### Issue Reporting
1. Check service status: `https://api.peterpanai.com/health`
2. View logs: `docker logs new-api`
3. Contact admin: Via WeChat

### Maintenance
- **Auto-update**: Docker images auto-pull latest versions
- **Backup**: Regular database backups
- **Monitoring**: Service health monitoring

### Security Recommendations
1. Rotate API keys regularly
2. Store keys in environment variables
3. Set IP access restrictions
4. Monitor abnormal usage patterns

---

## 📋 Changelog

### 2026-04-13
- ✅ Fixed Nginx redirect configuration
- ✅ Fixed database ServerAddress configuration
- ✅ Verified API calls working
- ✅ Created custom usage documentation
- ✅ Configured OpenClaw model integration

### 2026-04-11
- 🚀 Initial new-api deployment
- 🔧 Configured PostgreSQL database
- 🌐 Set up domain and SSL certificates
- 🔐 Created admin account and API tokens

---

**Last Updated**: 2026-04-13  
**Maintainer**: Pan Mingcai  
**Status**: ✅ Production environment running normally