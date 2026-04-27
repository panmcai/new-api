# 使用文档

网关：**https://api.peterpanai.com**（API 基址为 **`https://api.peterpanai.com/v1`**）

1. 打开 [https://api.peterpanai.com](https://api.peterpanai.com) 登录，在 **控制台 → 令牌** 创建 `sk-...`。
2. 调用时把下面示例里的 `YOUR_API_KEY` 换成你的密钥；`model` 换成当前站点可用的模型名。

**健康检查**

```bash
curl -sS https://api.peterpanai.com/health
```

**对话示例**

```bash
curl -sS https://api.peterpanai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"你的模型名","messages":[{"role":"user","content":"你好"}]}'
```

**Python**

```python
from openai import OpenAI
client = OpenAI(api_key="YOUR_API_KEY", base_url="https://api.peterpanai.com/v1")
print(client.chat.completions.create(model="你的模型名", messages=[{"role":"user","content":"你好"}]).choices[0].message.content)
```

**Cursor 等工具**：Base URL 填 `https://api.peterpanai.com/v1`，API Key 填令牌。

额度若走 **兑换码**，在控制台 **充值** 页兑换；码由管理员发放。更多一步见 [快速入门](/docs/quick)。
