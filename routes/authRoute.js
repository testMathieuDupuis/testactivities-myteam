const AuthController = require('../controllers/AuthController')
const UploadController = require('../controllers/UploadController')

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

    authRoutes.post(
        '/forgot',
        AuthController.forgotPassword
    )

    authRoutes.post(
        '/reset',
        AuthController.resetPassword
    )

    authRoutes.post(
        '/delete',
        AuthController.deleteUser
    )

    authRoutes.post(
        '/logout',
        AuthController.logout
    )
}