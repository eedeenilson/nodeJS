const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config');

/**
 * @api {post} /user/ Crear nuevo usuario.
 * @apiName PostUser
 * @apiGroup User
 *
 * @apiParam {String} name Nombre completo del usuario.
 * @apiParam {String} username Usuario dentro de la aplicación.
 * @apiParam {String} password Contraseña.
 * @apiParam {String} email Correo electrónico del usuario.
 * @apiParam {Number} createdBy Identificador del usuario que ha creado el nuevo usuario.
 *
 * @apiSuccessExample Body:
 *    {
        "name": "John Doe",
        "username": "doe777",
        "password": "contraseniasegura",
        "email": "doe777@doe.com",
        "createdBy": 1
      }
 *
 * @apiError InternalError El usuario no fue creado.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "InternalError"
 *     }
 */

exports.create = function create(req, res) {
  const newUser = new User(req.body);
  if (!newUser.username) {
    res.status(400).send({
      error: true,
      message: 'Please provide all data',
    });
  } else {
    try {
      User.createUser(newUser, (err, user) => {
        if (err) {
          if (err.errno === 1062) {
            return res.status(400).send({
              error: 400,
              message: 'Username has been used',
            });
          }
          return res.status(400).send({
            error: 400,
            message: err.code,
          });
        }
        return res.json(user);
      });
    } catch (err) {
      console.error = () => {
        throw new Error('Ha ocurrido un error');
      };
    }
  }
};

/**
 * @api {get} /user Todos los usuarios.
 * @apiName GetAllUser
 * @apiGroup User
 *
 * @apiSuccess {Number} id Identificador del usuario.
 * @apiSuccess {String} name Nombre completo del usuario.
 * @apiSuccess {String} username Usuario dentro de la aplicación.
 * @apiSuccess {String} password Contraseña encriptada.
 * @apiSuccess {String} email Correo electrónico del usuario.
 * @apiSuccess {String} createdAt Fecha en que fue registrado el usuario.
 * @apiSuccess {Number} createdBy Identificador del usuario que ha creado el nuevo usuario.
 * @apiSuccess {String} updatedAt Fecha de la ultima actualización del usuario.
 * @apiSuccess {Number} updatedBy Identificador del usuario que ha realizado la ultima modificación.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    [{
        "id": 7,
        "name": "John Doe",
        "username": "doe777",
        "password": "$2b$15$0FIdTSCNFu427p6kYP0n4UXmYtep4a57if1TE5ssqxY7Ulm",
        "email": "doe777@doe.com",
        "createdAt": "2020-09-26T21:00:12.000Z",
        "createdBy": 1,
        "updatedAt": "2020-09-26T21:39:50.000Z",
        "updatedBy": "2020-09-26T21:39:50.000Z"
      },
      {
        "id": 7,
        "name": "John Doe",
        "username": "doe777",
        "password": "$2b$15$0FIdTSCNFu427p6kYP0n4UXmYtep4a57if1TE5ssqxY7Ulm",
        "email": "doe777@doe.com",
        "createdAt": "2020-09-26T21:00:12.000Z",
        "createdBy": 1,
        "updatedAt": "2020-09-26T21:39:50.000Z",
        "updatedBy": "2020-09-26T21:39:50.000Z"
      }]
 *
 * @apiError InternalError No se pudieron obtener los registros.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "InternalError"
 *     }
 */

exports.getAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(data);
  });
};

/**
 * @api {get} /user/:id Información de usuario.
 * @apiName GetOneUser
 * @apiGroup User
 *
 * @apiParam {Number} id Identificador único del usuario.
 *
 * @apiSuccess {Number} id Identificador del usuario.
 * @apiSuccess {String} name Nombre completo del usuario.
 * @apiSuccess {String} username Usuario dentro de la aplicación.
 * @apiSuccess {String} password Contraseña encriptada.
 * @apiSuccess {String} email Correo electrónico del usuario.
 * @apiSuccess {String} createdAt Fecha en que fue registrado el usuario.
 * @apiSuccess {Number} createdBy Identificador del usuario que ha creado el nuevo usuario.
 * @apiSuccess {String} updatedAt Fecha de la ultima actualización del usuario.
 * @apiSuccess {Number} updatedBy Identificador del usuario que ha realizado la ultima modificación.
 *

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    [{
        "id": 7,
        "name": "John Doe",
        "username": "doe777",
        "password": "$2b$15$0FIdTSCNFu427p6kYP0n4UXmYtep4a57if1TE5ssqxY7Ulm",
        "email": "doe777@doe.com",
        "createdAt": "2020-09-26T21:00:12.000Z",
        "createdBy": 1,
        "updatedAt": "2020-09-26T21:39:50.000Z",
        "updatedBy": "2020-09-26T21:39:50.000Z"
      }]
 *
 * @apiError InternalError El usuario no fue encontrado.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "InternalError"
 *     }
 */

exports.getOne = (req, res) => {
  const { userId } = req.params;
  User.getOne(userId, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).send(data);
  });
};

/**
 * @api {put} /user/:id Edita usuario.
 * @apiName PutUser
 * @apiGroup User
 *
 * @apiParam {Number} id Identificador único del usuario.
 * @apiParam {String} name Nombre completo del usuario.
 * @apiParam {String} email Correo electrónico del usuario.
 * @apiParam {Number} role Rol del usuario dentro de la aplicación.
 * @apiParam {String} urlPhoto URL donde se almacena la foto del usuario.
 * @apiParam {Number} updatedBy Identificador del usuario que ha realizado la ultima modificación.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    [{
        "name": "John Doe",
        "email": "doe777@socialinnovatech.com",
        "urlPhoto": url,
        "role": 1,
        "updatedBy": 1
      }]
 *
 * @apiError InternalError El usuario no fue creado.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "InternalError"
 *     }
 */

exports.update = (req, res) => {
  const { userId } = req.params;
  const user = req.body;

  User.updateById(user, userId, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    }
    return res.status(200).send(data);
  });
};

/**
 * @api {post} /user/login Verificar credenciales.
 * @apiName VerifyUserCredentials
 * @apiGroup User
 *
 * @apiSuccess {String} username Usuario dentro de la aplicación.
 * @apiSuccess {String} password Contraseña encriptada.

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *    {
        "success": true,
        "message": "Authentication successful!",
        "user": [],
        "token": "0.xfqPWID-Mgl3Yr8VFRadNAR6IlS4n-UDs1fHrk7S0Tk"
      }
 *
 * @apiError InternalError El usuario no fue encontrado.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "InternalError"
 *     }
 */

exports.getLogin = (req, res) => {
  const login = req.body;
  User.getCredenciales(login.username, (err, data) => {
    if (err) {
      res.status(500).send(`Internal server error ${err}`);
    } else if (data.length < 1) {
      const message = {
        message: 'Invalid user',
      };
      res.status(400).send(message);
    } else {
      const te = data[0].password;
      if (bcrypt.compareSync(login.password, te)) {
        // res.json(data);

        // res.json(data);
        const token = jwt.sign({ user: login }, config.secret, {
          // expiresIn: '5m' // expires in 24 hours
        });
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          user: data,
          token,
        });
      } else {
        const message = {
          message: 'Incorrect password',
        };
        res.status(400).send(message);
      }
    }
  });
};

