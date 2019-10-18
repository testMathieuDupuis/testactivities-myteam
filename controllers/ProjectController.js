var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');

global.fetch = require('node-fetch'); //use by cognito internally
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const uuidv1 = require('uuid/v1');
var AWS = require("aws-sdk");

module.exports = {

  async getAllProjects(req, res) {
    var config = require("../config/config")(req);
    var table = config.tables.project;
    AWS.config.update({
      region: config.aws_region
    });

    var params = {
      TableName: table
    };

    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.scan(params, onScan);
    function onScan(err, data) {
      if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("Scan succeeded.");
        res.send(data.Items);
      }
    }
  },

  async getProject(req, res) {
    var params = {
      TableName: table,
      Key: {
        "id": req.body.id
      }
    };

    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.get(params, function (err, data) {
      if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        console.log("GetItem succeeded:");
        res.send(data.Item);
      }
    });
  },

  async createProject(req, res) {
    var config = require("../config/config")(req);
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(config.cognito_pool);

    var ddb = new AWS.DynamoDB();
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (session.isValid()) {
          var params = {
            TableName: table,
            Item: {
              'id': {S: uuidv1()},
              'date': {S: new Date().toISOString().slice(0, 10)},
              'name': {S: req.body.name},
              'userId': {S: session.idToken.payload.sub}
            }
          };

          ddb.putItem(params, function (err, data) {
            if (err) {
              res.send(err);
            } else {
              res.send(data);
            }
          });

        } else {
          res.send(err);
        }
      });
    }
  }
}