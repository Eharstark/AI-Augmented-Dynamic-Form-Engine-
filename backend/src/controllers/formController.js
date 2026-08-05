const FormSchema = require('../models/FormSchema');
const Submission = require('../models/Submission');   // ← new

const getForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const form = await FormSchema.findOne({ formId });

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const submitForm = async (req, res) => {   // ← new
  try {
    const { formId } = req.params;
    const data = req.body;

    const submission = await Submission.create({ formId, data });
    res.status(201).json({ success: true, submissionId: submission._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getForm, submitForm };   // ← updated