# 快速入门

网关：**https://api.peterpanai.com** · API：**https://api.peterpanai.com/v1**

1. 打开 [https://api.peterpanai.com](https://api.peterpanai.com) 登录 → **令牌** 里创建密钥。  
2. 测试：

```bash
curl -sS https://api.peterpanai.com/health
curl -sS https://api.peterpanai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"你的模型名","messages":[{"role":"user","content":"你好"}]}'
```

部署后阅读（前端渲染）：[使用文档（中文）](/docs/usage-zh) · [Usage (EN)](/docs/usage-en) · [文档中心](/docs/index.html) · 仓库内源文件见 `web/public/docs/`。
