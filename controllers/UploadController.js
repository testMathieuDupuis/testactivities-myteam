var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');

const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

module.exports = {

  async uploadFile(req, res) {
    fs.readFile(req.body.filePath, (err, data) => {
      if (err) throw err;
      const params = {
          Bucket: 'ratio-dev-raw',
          Key: 'fileTest.pdf', 
          Body: JSON.stringify(data, null, 2)
      };
      s3.upload(params, function(s3Err, data) {
          if (s3Err) throw s3Err
          res.send(`File uploaded successfully at ${data.Location}`);
      });
   });
  }
}