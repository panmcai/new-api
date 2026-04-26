# PeterPanAI API 快速入门

## 🚀 30秒开始使用

### 1. 测试 API 是否正常
```bash
curl https://api.peterpanai.com/health
```
应该返回: `{"status":"ok"}`

### 2. 使用你的 API 密钥测试
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your API Key>" \
  -d '{"model":"glm-5.1","messages":[{"role":"user","content":"Hello"}]}' \
  "https://api.peterpanai.com/v1/chat/completions"
```

## 📋 基本信息

| 项目 | 值 |
|------|-----|
| **API 地址** | `https://api.peterpanai.com/v1` |
| **API 密钥** | `<your API Key>` |
| **默认模型** | `glm-5.1` |
| **管理界面** | `https://api.peterpanai.com` |
| **登录用户** | `panmcai` |

## 🎯 主要用途

### 1. 直接 API 调用
```python
import openai
client = openai.OpenAI(
    api_key="<your API Key>",
    base_url="https://api.peterpanai.com/v1"
)
```

### 2. OpenClaw 集成
已配置为 OpenClaw 的模型提供商，可直接使用。

### 3. Claude Code / Cursor 等 IDE 工具
支持所有 OpenAI 兼容的客户端。

## 🔧 管理功能

访问 `https://api.peterpanai.com` 可以:
- 查看 API 使用统计
- 管理用户和令牌
- 添加新的模型渠道
- 设置速率限制和配额

## 🆘 遇到问题？

### 快速诊断
```bash
# 1. 检查服务状态
curl https://api.peterpanai.com/health

# 2. 检查 API 状态
curl https://api.peterpanai.com/api/status

# 3. 查看服务日志
docker logs new-api
```

### 常见错误
- **401 错误**: API 密钥错误
- **404 错误**: 模型不存在
- **429 错误**: 请求频率过高
- **502 错误**: 服务重启中

## 📚 详细文档

查看完整文档:
- [中文详细指南](./docs/custom/API_USAGE_ZH.md)
- [English Documentation](./docs/custom/API_USAGE_EN.md)

---

**提示**: 此 API 服务基于 new-api 构建，提供统一的 OpenAI 兼容接口，支持 GLM-5.1 等大模型。

**最后测试时间**: 2026-04-13  
**状态**: ✅ 运行正常