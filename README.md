# jm-config-mq
mq plugin for jm-config

#using
    var _onmessage = function(channel, message){
        logger.debug('mq channel: %s, message: %s', channel, message);
    };
    mq.psubscribe('config.*');
    mq.onPMessage(function(pattern, channel, message){
        _onmessage(channel, message);
    });
