const mongoose = require('mongoose');
const Types    = mongoose.Schema.Types;
const ShortID  = require('shortid');

const memberSchema = mongoose.Schema({
  name    : Types.String,
  position: Types.String,
  desc    : Types.String,
  image   : Types.Buffer
});

const pageSchema = mongoose.Schema({
  _id: {
    type     : String,
    'default': ShortID.generate
  },
  title  : Types.String,
  members: [memberSchema]
});

const Member = mongoose.model('Member', memberSchema);
const Page   = mongoose.model('Page'  , pageSchema);

module.exports = {Member, Page}