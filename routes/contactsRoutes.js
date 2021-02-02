const { Router } = require('express');
const { listContacts, validateContactId, getById, validateCreateContact, validateUpdateContact, updateContacts, removeContact, addContact } = require('../controllers/contactsController');

const router = Router();
router.get('/', listContacts);
router.get('/:contactId', validateContactId, getById);
router.post('/', validateCreateContact, addContact);
router.delete('/:contactId', validateContactId, removeContact);
router.patch('/:contactId', validateContactId, validateUpdateContact, updateContacts);

module.exports = router;