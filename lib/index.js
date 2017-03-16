var jm = require('jm-core');
var logger = jm.getLogger('jm-config-mq');

module.exports = function (opts, app) {
    var o = {
        ready: false
    };

    if (!app.modules.config) {
        logger.warn('no config module found. so I can not work.')
        return o;
    }
    var config = app.modules.config;

    var cb_mq = function () {
        o.ready = true;
    };

    var mq = opts.mq;
    if (typeof opts.mq === 'string') {
        mq = require('jm-mq')({url: opts.mq}, cb_mq);
    }
    if (config.mq) {
        mq = config.mq;
        o.ready = true;
    }
    mq || (mq = require('jm-mq')(null, cb_mq));

    config.on('setConfig', function (opts) {
        if (!opts.root) return;
        var channel = 'config.setConfig:' + opts.root;
        mq.publish(channel, JSON.stringify(opts));
    });
    config.on('setConfigs', function (opts) {
        if (!opts.root) return;
        var channel = 'config.setConfigs:' + opts.root;
        mq.publish(channel, JSON.stringify(opts));
    });
    config.on('delConfig', function (opts) {
        if (!opts.root) return;
        var channel = 'config.delConfig:' + opts.root;
        mq.publish(channel, JSON.stringify(opts));
    });
    config.on('delRoot', function (opts) {
        if (!opts.root) return;
        var channel = 'config.delRoot:' + opts.root;
        mq.publish(channel, JSON.stringify(opts));
    });
};
