const express = require('express');
const router = express.Router();
const { getForm, submitForm } = require('../controllers/formController');

router.get('/:formId', getForm);
router.post('/:formId/submit', submitForm);

module.exports = router;