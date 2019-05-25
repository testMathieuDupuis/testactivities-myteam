const AuthController = require('../controllers/AuthController')

module.exports = authRoutes => {
    authRoutes.post(
        '/register',
        AuthController.register
    )

    authRoutes.post(
        '/login',
        AuthController.login
    )

    authRoutes.post(
        '/confirme',
        AuthController.confirmeEmail
    )
}