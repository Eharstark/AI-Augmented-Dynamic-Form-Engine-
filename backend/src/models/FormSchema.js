const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  id: String,
  label: String,
  type: String,
  options: [String],
  required: Boolean,
  showIf: mongoose.Schema.Types.Mixed
}, { _id: false });

const formSchemaSchema = new mongoose.Schema({
  formId: { type: String, required: true, unique: true },
  fields: [fieldSchema]
});

module.exports = mongoose.model('FormSchema', formSchemaSchema);