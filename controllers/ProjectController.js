var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');

var AWS = require("aws-sdk");

AWS.config.update({
  region: "ca-central-1",
  accessKeyId: 'AKIAU7A6HHUS6QULJXZI',
  secretAccessKey: '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'
});

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
  }
}