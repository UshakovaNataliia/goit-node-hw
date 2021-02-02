const { Router } = require('express');
const { listContacts, validateContactId, getById, validateCreateContact, validateUpdateContact, updateContacts, removeContact, addContact } = require('../controllers/contactsController');

const router = Router();
router.get('/', listContacts);
router.get('/:contactId', validateContact, getById);
router.post('/', validateCreateContact, addContact);
router.delete('/:contactId', validateContact, removeContact);
router.patch('/:contactId', validateContact, validateUpdateContact, updateContacts);

module.exports = router;