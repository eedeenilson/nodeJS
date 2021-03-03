const bcrypt = require('bcrypt');
const sql = require('../db/db');
// User object constructor
const User = function User(user) {
  this.name = user.name;
  this.username = user.username;
  this.password = bcrypt.hashSync(user.password, 15);
  this.email = user.email;
  this.createdBy = user.createdBy;
};

User.createUser = (user, result) => {
  sql.query('INSERT INTO user SET ?', user, (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res.insertId);
    }
  });
};

User.getAll = (result) => {
  sql.query('SELECT * FROM user;', (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.updateById = (user, userId, result) => {
  sql.query(
    `UPDATE user
      SET name = ?,  email = ?, updatedBy = ?
      WHERE userId = ?`,
    [user.name, user.email, user.createdBy, user.updatedBy, userId],
    (err, res) => {
      if (err) {
        result(err, null);
      } else {
        result(null, res);
      }
    },
  );
};

User.getOne = (userId, result) => {
  sql.query('SELECT * FROM user WHERE userId = ?;', userId, (err, res) => {
    if (err) {
      console.error = () => {
        throw new Error(err);
      };
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

User.getCredenciales = (username, result) => {
  sql.query('SELECT * from user WHERE username = ? ', [username], (err, res) => {
    if (err) {
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
