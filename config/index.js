require('log4js').configure(__dirname + '/log4js.json');
var config = {
    development: {
        port:20000,
        modules: {
            'config': {
                module: 'jm-config'
            },
            'jm-config-mq': {
                module: process.cwd() + '/lib'
            }
        }
    },
    production: {
        port: 20000,
        modules: {
            'config': {
                module: 'jm-config'
            },
            'jm-config-mq': {
                module: process.cwd() + '/lib'
            }
        }
    }
};

var env = process.env.NODE_ENV||'development';
config = config[env]||config['development'];
config.env = env;

module.exports = config;
