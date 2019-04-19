var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const PDFImage = require('../models/pdfImages');
const Form = require('../models/forms');
const Box = require('../models/boxes');

router.get("/getImages", (req, res) => {
  PDFImage.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.get("/getImage/:id", (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  PDFImage.findById({ "_id": id }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

/*
  I think you'd enjoy the await / async syntax, though you'd probably have to use some promisified version of mongoose
  These could be written as:

  router.post("/updateImage", async (req, res) => {
    const { id, update } = req.body;

    try {
      await PDFImage.findOneAndUpdate(id, update);
      res.json({ success: true });
    } catch (e) {
      res.json({ success: false, error: e });
    }
*/
router.post("/updateImage", (req, res) => {
  const { id, update } = req.body;
  PDFImage.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.delete("/deleteImage", (req, res) => {
  const { id } = req.body;
  PDFImage.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

router.post("/postImage", (req, res) => {
  console.log('my image', req)
  let data = new PDFImage();

  const { imageUrl } = req.body;

  data.imageUrl = imageUrl;

  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: imageUrl });
  });
});

router.get("/getForms", (req, res) => {
  Form.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    // Can just be res.json({ success: true, data });
    return res.json({ success: true, data: data });
  });
});

router.post("/postForm", (req, res) => {
  console.log('my form', req)
  let data = new Form();

  const { formTitle, formType, boxIds } = req.body;

  data.formTitle = formTitle;
  data.formType = formType;
  // data.boxIds = boxIds;

  data.save(err => {
    if (err) return res.json({ success: false, error: err });

    // const box = new Box({
    //     title: formTitle,
    //     formType: formType,
    //     boxIds: boxIds
    // })
    return res.json({ success: true, data: data });
  });
});

router.delete("/deleteForm/:id", (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  // I think mongoose allows for findByIdAndRemove
  // Therefore, I think you can just call Form.findByIdAndRemove(id, cb)
  Form.deleteOne({"_id": id}, err => {
    if (err) return res.send(err);
    return res.json({ success: true, message: 'deleted ' + id });
  });
});

router.get("/getForm/:id", (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  Form.findById({ "_id": id }, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.patch("/updateForm/:id", (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  Form.findOneAndUpdate({ "_id": id }, req.body, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.get("/getBoxes", (req, res) => {
  // use collection here
  Box.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});


router.post("/postBox", (req, res) => {
  console.log('my form', req.body)
  let data = new Box();

  const { boxTitle, boxType, boxData, coordinates, dimensions, formId } = req.body;

  data.boxTitle = boxTitle;
  data.boxType = boxType;
  data.boxData = boxData;
  data.coordinates = coordinates;
  data.dimensions = dimensions;
  data.formId = formId;
  // data.boxIds = boxIds;

  data.save(err => {
    if (err) return res.json({ success: false, error: err });

    // const box = new Box({
    //     title: formTitle,
    //     formType: formType,
    //     boxIds: boxIds
    // })
    return res.json({ success: true, data: data });
  });
});

router.delete("/deleteBox/:id", (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  Box.deleteOne({"_id": id}, err => {
    if (err) return res.send(err);
    return res.json({ success: true, message: 'deleted ' + id });
  });
});

module.exports = router;
