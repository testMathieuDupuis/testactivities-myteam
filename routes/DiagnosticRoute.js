const DiagnosticController = require('../controllers/DiagnosticController')

module.exports = DiagnosticRoutes => {
    DiagnosticRoutes.get(
        '/ping',
        DiagnosticController.ping
    )
}