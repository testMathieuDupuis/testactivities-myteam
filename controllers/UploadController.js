var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');

const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const pdf = require('pdf-parse');

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
      if (err) res.send(err);
      else {
        pdf(resp.Body).then(function (data) {
          resultsExtract = [];
          lines = data.text.split("[");
          for (i = 0; i < lines.length; i++) {
            if (lines[i].indexOf('faute') >= 0 && lines[i].indexOf('dommage') >= 0) {
              resultsExtract.push("[" + lines[i]);
            }
          }
          res.send(resultsExtract);
        });
      }
    });
  }
}