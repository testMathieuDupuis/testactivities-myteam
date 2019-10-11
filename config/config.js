module.exports = {
  cognito_pool:{
    UserPoolId: process.env.RATIO_BE_COGNITO_POOL_ID,     
    ClientId: process.env.RATIO_BE_COGNITO_CLIENT_ID 
  },
  
  aws_region : process.env.RATIO_BE_AWS_REGION || process.env.AWS_REGION || 'ca-central-1',
  cookie_age: process.env.RATIO_BE_COOKIE_AGE || 1209600000,
  port: process.env.RATIO_BE_PORT || 8081,
  session_secret: process.env.RATIO_BE_SESSION_SECRET || "PFE2019_RATIO",
  stage: process.env.RATIO_BE_STAGE || "dev",
  tables:{
    project: process.env.RATIO_BE_TABLE_PROJECT || "ratio_project_dev",
    session: process.env.RATIO_BE_TABLE_SESSION || "ratio_session_dev"
  }
}