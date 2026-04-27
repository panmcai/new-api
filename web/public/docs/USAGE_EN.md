# Usage

Gateway: **https://api.peterpanai.com** — API base: **`https://api.peterpanai.com/v1`**

1. Sign in at [https://api.peterpanai.com](https://api.peterpanai.com), go to **Console → Tokens**, create a `sk-...` key.
2. Replace `YOUR_API_KEY` below; set `model` to a model enabled on this site.

**Health**

```bash
curl -sS https://api.peterpanai.com/health
```

**Chat**

```bash
curl -sS https://api.peterpanai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"your-model-name","messages":[{"role":"user","content":"Hello"}]}'
```

**Python**

```python
from openai import OpenAI
client = OpenAI(api_key="YOUR_API_KEY", base_url="https://api.peterpanai.com/v1")
print(client.chat.completions.create(model="your-model-name", messages=[{"role":"user","content":"Hello"}]).choices[0].message.content)
```

**Cursor / similar**: Base URL `https://api.peterpanai.com/v1`, API key = your token.

For **redemption codes**, use **Top-up** in the console; codes come from the admin. See also [Quick Start](/docs/quick).
