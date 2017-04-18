# jm-config-mq

mq plugin for jm-config

## using

```javascript
var _onmessage = function(channel, message){
    logger.debug('mq channel: %s, message: %s', channel, message);
};
mq.psubscribe('config.*');
mq.onPMessage(function(pattern, channel, message){
    _onmessage(channel, message);
});
```

## 配置参数

基本配置 请参考 [jm-server] (https://github.com/jm-root/jm-server)

mq Redis 服务器Uri

mq_public [mq] 消息队列服务器Uri, 默认采用mq
