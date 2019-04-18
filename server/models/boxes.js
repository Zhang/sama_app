const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const BoxSchema = new Schema(
  {
    boxTitle: String,
    boxType: String,
    boxData: String,
    coordinates: Object,
    dimensions: Object,
    formId: [{ type: Schema.Types.ObjectId, ref: 'Form' }]
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Box", BoxSchema);
