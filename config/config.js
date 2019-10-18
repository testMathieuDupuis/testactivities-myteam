module.exports = function (req){
  var context = req.context || {};
  
  return {
    cognito_pool:{
      UserPoolId: context.cognito_pool_id || process.env.RATIO_BE_COGNITO_POOL_ID,     
      ClientId: context.cognito_pool_client_id  || process.env.RATIO_BE_COGNITO_CLIENT_ID 
    },
    
    aws_region : context.aws_region || process.env.RATIO_BE_AWS_REGION || process.env.AWS_REGION || 'ca-central-1',
    cookie_age: process.env.RATIO_BE_COOKIE_AGE || 1209600000,
    isLambda: process.env.isLambda || 0,
    port: process.env.RATIO_BE_PORT || 8081,
    session_secret: context.session_secret || process.env.RATIO_BE_SESSION_SECRET || "PFE2019_RATIO",
    tables:{
      project: context.table_project || process.env.RATIO_BE_TABLE_PROJECT || "ratio_project_dev",
      session: context.table_session || process.env.RATIO_BE_TABLE_SESSION || "ratio_session_dev"
    }
  }
}