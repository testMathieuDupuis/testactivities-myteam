var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');

module.exports = {

    async upload(req, res) {
        console.log("test!!!");
        app.use(cors())
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
            cb(null, 'public')
          },
          filename: function (req, file, cb) {
            cb(null, Date.now() + '-' +file.originalname )
          }
      })

      var upload = multer({ storage: storage }).single('file')
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
   return res.status(200).send(req.file)

 })
    }
}