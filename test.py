import os
import requests
import sys

with open('.env') as f:
    for line in f:
        if '=' in line and not line.startswith('#'):
            key, value = line.strip().split('=', 1)
            os.environ[key] = value

response = requests.post(
    url="https://openrouter.ai/api/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {os.environ['OPENROUTER_API_KEY']}",
        "Content-Type": "application/json",
    },
    json={
        "model": "qwen/qwen3.5-flash-02-23",
        "messages": [
            {"role": "user", "content": "以下の文章を関西弁に変換して。結果のみ出力して。"+sys.argv[1]}
        ]
    }
)

print(response.json()['choices'][0]['message']['content'])
