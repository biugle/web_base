# Cordova 使用说明

```bash
# 全局安装 cordova 吧，好用点。
npm install -g cordova@11.1.0

cordova -v
# 11.1.0

# 若需更换签名文件可以使用以下命令生成新签名
keytool -genkey -v -keystore ./web_base.jks -keyalg RSA -keysize 2048 -validity 10000 -alias web_base_key

# 工具推荐
# 调试 https://github.com/Tencent/vConsole/
# logo https://logo.com/
# icon https://www.pgyer.com/tools/appIcon/
# loading https://www.intogif.com/loading/
# 启动图 https://icon.wuruihong.com/
```
