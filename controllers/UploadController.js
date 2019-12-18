var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');

const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const pdf = require('pdf-parse');

AWS.config.update({
  region: "ca-central-1"
});

var docClient = new AWS.DynamoDB.DocumentClient();

//TODO This module should not exist except to get a signed url
//TODO to check if some AI is there

module.exports = {

  async uploadFile(req, res) {
    fs.readFile(req.body.filePath, (err, data) => {
      if (err) throw err;
      const params = {
        Bucket: 'ratio-dev-raw',
        Key: 'fileTest.pdf',
        Body: JSON.stringify(data, null, 2)
      };
      s3.upload(params, function (s3Err, data) {
        if (s3Err) throw s3Err
        res.send(`File uploaded successfully at ${data.Location}`);
      });
    });
  },

  async readFile(req, res) {
    var params = { Bucket: 'ratio-dev-raw', Key: req.body.fileName };
    s3.getObject(params, function (err, resp) {
      if 
        (err) res.send(err);
      else {
        pdf(resp.Body).then(function (textData) {
          var params = {
            TableName: "ratio_words"
          };
          docClient.scan(params, onScan);
          function onScan(err, data) {
            if (err) {
              console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
              res.status(500).send(err);
            } else {

              resultsExtract = [];
              lines = textData.text.split("[");
              var maxVal = 0;
              for (i = 0; i < lines.length; i++) {
                var count = 0;
                data.Items.forEach(element => {
                  if (lines[i].indexOf(element.word) >= 0) {
                    count += element.weigth;
                  }
                });

                if(count > maxVal){
                  resultsExtract = [];
                  resultsExtract.push("[" + lines[i]);
                  maxVal = count;
                }
                else if(count == maxVal){
                  resultsExtract.push("[" + lines[i]);
                }
              }
              res.send(resultsExtract);
            }
          }
        });
      }
    });
  }
}