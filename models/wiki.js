const mongoose = require("mongoose");

const wikiSchema = new mongoose.Schema ({
  title:    {type: String, required: true},
  urlTitle: {type: String, required: true},
  content:  {type: String, required: true},
  category: {type: String, required: true},
  status: {
        type: String,
        enum : ['new','existing'],
        default: 'new'
    },
  date:     {type: Date, default: Date.now},
  tags:      {type: Array},
  author:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model("Wiki", wikiSchema);