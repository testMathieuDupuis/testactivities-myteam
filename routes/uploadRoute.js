const UploadController = require('../controllers/UploadController')

module.exports = uploadRoutes => {
    
    uploadRoutes.post(
        '/upload',
        UploadController.uploadFile
    )

    uploadRoutes.get(
        '/readFile',
        UploadController.readFile
    )
}