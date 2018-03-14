module.exports = function(server) {
  const {app, path} = server;

  app.get(path.login, (req, res) => {
    res.send('hello word dddd');
  });
}