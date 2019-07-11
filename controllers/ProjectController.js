var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const uuidv1 = require('uuid/v1');

var AWS = require("aws-sdk");

const poolData = {
  UserPoolId: "ca-central-1_jDy9yZPwd", // Your user pool id here    
  ClientId: "1vab45nv048apmbc85ljd4pf3q" // Your client id here
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

AWS.config.update({
  region: "ca-central-1"
});

var ddb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var table = "ratio_project";

module.exports = {

  async getAllProjects(req, res) {
    var params = {
      TableName: table
    };
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
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (session.isValid()) {
          var params = {
            TableName: 'ratio_project',
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