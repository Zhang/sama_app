const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const FormSchema = new Schema(
  {
    formTitle: String,
    formType: String,
    boxes: [{ type: Schema.Types.ObjectId, ref: 'Box'}]
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Form", FormSchema);
