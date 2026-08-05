require('dotenv').config();
const mongoose = require('mongoose');
const FormSchema = require('../models/FormSchema');

const insuranceClaim = {
  formId: "insurance_claim",
  fields: [
    { id: "incidentType", label: "What happened?", type: "select", options: ["animal_collision", "theft", "fire"], required: true },
    { id: "vehicle", label: "Vehicle make", type: "text", required: true },
    { id: "date", label: "Date of incident", type: "date", required: true },
    { id: "damage", label: "Describe the damage", type: "text", required: true, showIf: { incidentType: "animal_collision" } },
    { id: "policeReportNumber", label: "Police report number", type: "text", required: true, showIf: { incidentType: "theft" } },
    { id: "fireDepartmentCode", label: "Fire department code", type: "text", required: false, showIf: { incidentType: "fire" } }
  ]
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await FormSchema.deleteMany({ formId: "insurance_claim" });
    await FormSchema.create(insuranceClaim);
    console.log('Seeded insurance_claim schema successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();