const express = require("express");
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const bodaModel = require("../models/Boda");
const app = express();

app.get("/bodas", async (req, res) => {
  const bodas = await bodaModel.find({});

  try {
    res.send(bodas);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/boda", async (req, res) => {
  const boda = new bodaModel(req.body);

  try {
    await boda.save();
    res.send(boda);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/boda/:id", async (req, res) => {
  try {
    const boda = await bodaModel.findByIdAndDelete(req.params.id);

    if (!boda) res.status(404).send("No boda found");
    res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch("/boda/:id", async (req, res) => {
  try {
    const boda = await bodaModel.findByIdAndUpdate(req.params.id, req.body,{new: true});
    await boda.save();
    res.send(boda);
  } catch (err) {
    res.status(500).send(err);
  }
});

//setup multer storage
const uploadPath = path.join('public', bodaModel.uploadBasePath);
const imageMimeTypes = ['image/jpg', 'image/png', 'image/tif'];
const bodaProfileImageStorage = multer.diskStorage({
	dest: uploadPath,
	fileFilter: (req, file, callback) => {
		callback(null, imageMimeTypes.includes(file.mimetype));
	},
});

const upload = multer({ storage: bodaProfileImageStorage });

// @route for uploading boda profile image

app.patch('/profile-image/boda/:id', upload.single('profile-image'), async (req, res) => {

    try {
        let img = fs.readFileSync(req.file.path);
        let encode_image = img.toString('base64');
        const finalImg = {
            contentType: req.file.mimetype,
            image: new Buffer.from(encode_image, 'base64'),
        };
        const boda = await bodaModel.findByIdAndUpdate(req.params.id, {img: {...finalImg}},{new: true});
        await boda.save();
        res.send(boda);

        if(finalImg) {
            fs.unlink(path.join(uploadPath,req.file.filename), err => {
                if(err) console.error(err);
            })
        }
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // @route for getting boda profile image
    app.get('/profile-image/boda/:id', (req, res) => {
      const id = req.params.id;
      bodaModel.findOne({ _id: id }, (err, result) => {
        if (err) return res.status(500).send(err);
    
        res.contentType(result.img.contentType);
        res.send(result.img.image);
      });
    });

module.exports = app;
