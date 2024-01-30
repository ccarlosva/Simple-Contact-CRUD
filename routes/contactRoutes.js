const express = require("express");
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require('../controllers/contactController');
const validateToken = require("../middleware/validateTokenHandler");



router.use(validateToken)
// Routes remember the base rout is defined in server.js as /api/contacts
router.route('/').get(getContacts).post(createContact);
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact) //this route has an id parameter that well use on the controller 

module.exports = router