# Ratio-Backend

## Getting Started
You need to set some environment vars in your computer.
Required:
RATIO_BE_COGNITO_POOL_ID : Pool id of your cognito pool
RATIO_BE_COGNITO_CLIENT_ID : Client id for your cognito pool

Optional:
RATIO_BE_AWS_REGION : AWS region used for Ratio. (Default: AWS_REGION || ca-central-1)
RATIO_BE_COOKIE_AGE : Rentention time for cookie (Default:1209600000)
RATIO_BE_PORT : Port of the backend of ratio (local-only, Default:8081)
RATIO_BE_SESSION_SECRET : Secret to validate session, need to define it only for prod (Default: PFE2019_RATIO)
RATIO_BE_STAGE : Stage of the application ex: dev|prod (Default: dev)
RATIO_BE_TABLE_PROJECT : Name of the project table (Default: ratio_project_dev)
RATIO_BE_TABLES_SESSION : Name of the project table (Default : ratio_session_dev)

### Prerequisites
For local "labda" only:
 * AWS SAM
 * Docker (only compatible on win10 pro/edu)

### Installing
To run local
Use any NodeJS 10 IDE

To run local "lambda" like

``` 
sam build --template=template-local.yml 
sam local start-api --port=8081 --region=ca-central-1 [--skip-pull-image]
```
use --skip-pull-image only at the second time, it's a little quicker
## Running the tests
Not test implemented yet....

## Deployment
To deploy in prod

```
sam build --template=template-prod.yml
sam publish 
```

## Contributing

All constant must be define in config.js and must be overridable with an environment var.