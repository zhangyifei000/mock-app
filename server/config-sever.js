const Express = require('express');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');
const logger = require('morgan');

const pathObj = require('./path-obj')

const app = new Express();


const port = "3000";
const host = "localhost";

const isRemote = true;
const remoteHost = "https://interface.meiriyiwen.com/";

const server = {
  app: app,
  path: pathObj
}

app.use(logger('tiny'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

if (isRemote) {
  console.log('使用代理服务器:', remoteHost);

  const proxy = httpProxy.createProxyServer({
    target: remoteHost
  });

  app.use('/', (req, res) => {
    proxy.web(req, res, {
      target: remoteHost,
      changeOrigin: true
    }, (error) => {
      console.log('远程代理服务器出现错误', error);

      proxy.close();
    })
  });
} else {
  console.log('使用本地的代理服务器')
  
  require('./myApp')(server);
}

 app.listen(port, host, function () {
  console.log('服务启动成功：http://%s:%s', host, port);
});