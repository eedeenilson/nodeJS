const User = require('../controllers/user');
const Middleware = require('../middleware/auth');

module.exports = function App(app) {
  app.route('/api/user/login').post(User.getLogin);

  app
    .route('/api/user')
    .get(Middleware.checkToken, User.getAll)
    .post(Middleware.checkToken, User.create);

  app
    .route('/api/user/:userId')
    .put(Middleware.checkToken, User.update)
    .get(Middleware.checkToken, User.getOne);
};
