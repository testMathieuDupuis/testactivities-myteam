const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const poolData = {
    UserPoolId: "ca-central-1_jDy9yZPwd", // Your user pool id here    
    ClientId: "1vab45nv048apmbc85ljd4pf3q" // Your client id here
};
const pool_region = 'ca-central-1';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = {
    async register(req, res) {
        var attributeList = [];
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: req.body.email }));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "name", Value: req.body.name }));

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