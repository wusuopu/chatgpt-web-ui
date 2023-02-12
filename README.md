# chatgpt web ui

使用 openai 提供的 api 所搭建的一个聊天机器人。
使用方法：

```
docker build -t chatgpt-web-ui .
docker run -p 80 chatgpt-web-ui
```

需要配置如下环境变量：

```
OPENAI_API_KEY = <api_key>
OPENAI_MODEL = text-davinci-003   # 默认使用 text-davinci-003 模型
```

若需要集成到微信公众号，则还需要配置如下信息，并在微信公众号后台配置“服务器地址(URL)”为 http://<host>/wechat，以及将当前机器的ip添加到 IP白名单 中去。

```
WECHAT_APP_ID = 
WECHAT_APP_SECRET = 
WECHAT_TOKEN = 
WECHAT_ENCODING_AES_KEY = 
WECHAT_CHECK_SIGNATURE = false | true
```

服务启动之后直接打开 http://<host>/ 进入对话界面。
