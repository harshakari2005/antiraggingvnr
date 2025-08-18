const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  rollNumber: String,
  message: String,
  location: String,
  bullyingType: String,
  status: String, // New field for Victim or Witness
  knowPerson: Boolean,
  privacy: String,
  accusedName: String,
  accusedRollNumber: String,
  accusedYear: String,
  accusedDepartment: String,
  image: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
