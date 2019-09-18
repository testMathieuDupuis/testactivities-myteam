const ProjectController = require('../controllers/ProjectController')

module.exports = projectRoutes => {
    
    projectRoutes.get(
        '/getAllProjects',
        ProjectController.getAllProjects
    )

    projectRoutes.get(
        '/getProject',
        ProjectController.getProject
    )

    projectRoutes.post(
        '/createProject',
        ProjectController.createProject
    )
}