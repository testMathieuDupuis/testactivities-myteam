const UploadController = require('../controllers/UploadController')

module.exports = uploadRoutes => {
    
    uploadRoutes.post(
        '/upload',
        UploadController.upload
        
    )
}