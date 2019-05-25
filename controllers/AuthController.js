const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const poolData = {
    UserPoolId: "us-east-2_YO1PjA5Jt", // Your user pool id here    
    ClientId: "2ss8g3j4750taaml3oobcle844" // Your client id here
};
const pool_region = 'us-east-2';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = {
    async register(req, res) {
        var attributeList = [];
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: req.body.email }));

        userPool.signUp(req.body.email, req.body.password, attributeList, null, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            cognitoUser = result.user;
            res.send(cognitoUser);
        });
    },

    async login(req, res) {
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: req.body.email,
            Password: req.body.password,
        });

        var userData = {
            Username: req.body.email,
            Pool: userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                console.log('access token + ' + result.getAccessToken().getJwtToken());
                console.log('id token + ' + result.getIdToken().getJwtToken());
                console.log('refresh token + ' + result.getRefreshToken().getToken());
                res.send(result);
            },
            onFailure: function (err) {
                res.send(cognitoUser);
                console.log(err);
            },

        });
    },

    async confirmeEmail(req, res) {
        var userData = {
            Username: req.body.email,
            Pool: userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.confirmRegistration(req.body.code, true, function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            res.send(result);
        });
    }
}