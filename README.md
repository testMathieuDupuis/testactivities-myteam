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
RATIO_BE_TABLE_PROJECT : Name of the project table (Default: ratio_project_dev)
RATIO_BE_TABLES_SESSION : Name of the project table (Default : ratio_session_dev)
IS_LAMBDA : Set to 0 on local (always) even if you use lambda local (the template will set it for you)

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
To deploy on AWS

Automatic
Push
merge to master branch
Tag your commit with the caption vX.X.X.X (try to set the version in package.json the same thing)
CodeBuild will build and deploy automaticly on Dev server
```
Manually
sam build --template=template-dev.yml
sam package --s3-bucket ratio-code --output-template-file template-out.yml
aws lambda update-function-code --function-name="ratio_backend" --s3-bucket="ratio-code" --no-publish --s3-key="{name of the package}"
aws lambda publish-version --function-name="ratio_backend" --description="{version}"
```

## Contributing

All constant must be define in config.js and must be overridable with an environment var.