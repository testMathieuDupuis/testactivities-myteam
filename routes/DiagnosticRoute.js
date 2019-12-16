const DiagnosticController = require('../controllers/DiagnosticController')

module.exports = DiagnosticRoutes => {
    DiagnosticRoutes.get(
        '/diag',
        DiagnosticController.ping
    )
}