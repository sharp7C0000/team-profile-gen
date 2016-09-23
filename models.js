const mongoose = require('mongoose');
const Types    = mongoose.Schema.Types;

const memberSchema = mongoose.Schema({
  name    : Types.String,
  position: Types.String,
  desc    : Types.String,
  photo   : Types.Buffer
});

const pageSchema = mongoose.Schema({
  url    : Types.String,
  title  : Types.String,
  members: [memberSchema]
});

const Member = mongoose.model('Member', memberSchema);
const Page   = mongoose.model('Page'  , pageSchema);

module.exports = {Member, Page}