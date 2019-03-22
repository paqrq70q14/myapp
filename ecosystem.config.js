module.exports = {
  apps : [{
    name: 'myrenthouse node',
    script: 'app.js', //执行文件

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '47.102.194.63',
      ref  : 'origin/master',
      repo : 'git@github.com:paqrq70q14/myapp.git',
      path : '/usr/local/nginx/html',
      'post-deploy' : 'git pull && npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
