global.fetch = require('node-fetch'); //use by cognito internally
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');

module.exports = {
    async register(req, res) {
        var config = require("../config/config")(req);
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(config.cognito_pool);

        var attributeList = [];
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: req.body.email }));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "name", Value: req.body.name }));

        userPool.signUp(req.body.email, req.body.password, attributeList, null, function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).send(err);
                return;
            }
            cognitoUser = result.user;
            res.send(cognitoUser);
        });
    },

    async login(req, res) {
        var config = require("../config/config")(req);
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(config.cognito_pool);

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
                res.send(result);
            },
            onFailure: function (err) {
                res.send(cognitoUser);
                console.error(err);
            },

        });
    },

    async confirmeEmail(req, res) {
        var config = require("../config/config")(req);
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(config.cognito_pool);

        var userData = {
            Username: req.body.email,
            Pool: userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.confirmRegistration(req.body.code, true, function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).send(err);
                return;
            }
            res.send(result);
        });
    },

    async forgotPassword(req, res) {
        var config = require("../config/config")(req);
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(config.cognito_pool);

        var userData = {
            Username: req.body.email,
            Pool: userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.forgotPassword({
            onSuccess: function (result) {
                res.send(result);
            },
            onFailure: function (err) {
                res.send(err);
            },
        });
    },

    async resetPassword(req, res) {
        var config = require("../config/config")(req);
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(config.cognito_pool);

        var userData = {
            Username: req.body.email,
            Pool: userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.confirmPassword(req.body.code, req.body.password, {
            onSuccess: function (result) {
                res.send(result);
            },
            onFailure: function (err) {
                res.send(err);
            },
        });
    },

    async deleteUser(req, res) {
        var config = require("../config/config")(req);
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(config.cognito_pool);
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (session.isValid()) {
                    cognitoUser.deleteUser(function (err, result) {
                        if (err) {
                            console.error(err);
                            res.status(500).send(err);
                            return;
                        }
                        res.send(result);
                    });
                } else {
                    res.send(err);
                }
            });
        }
    },

    async logout(req, res) {
        var config = require("../config/config")(req);
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(config.cognito_pool);

        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser != null) {
            cognitoUser.signOut();
            res.send({message: "SUCCESS"});
            
        }
        else
            res.send({message: "FAILED"});
    },

    async changePassword(req, res) {
        var config = require("../config/config")(req);
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(config.cognito_pool);

        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, session) {
                if (session.isValid()) {
                    cognitoUser.changePassword(req.body.oldPassword, req.body.newPassword, function(err, result) {
                        if (err) {
                            res.send(err.message);
                            return;
                        }
                        res.send(result);
                    });
                } else {
                    res.send(err.message);
                }
            });
        }
        else{
            res.send("FAILED: NOT LOGGED IN");
        }
    }
}