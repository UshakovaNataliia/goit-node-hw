const { Router } = require('express');
const { validate } = require('../helpers/validateMiddleware');
const { createContact, getContactsList, getContactById, deleteContactReq, patchContact } = require('./contactsController');
const { createContactSchema, patchContactSchema, vildateId } = require('./contactsSchemes');
const router = Router();
router.post('/', validate(createContactSchema), createContact)
router.get('/', getContactsList)
router.get('/:id', validate(vildateId, "params"), getContactById)
router.patch('/:id', validate(vildateId, "params"), validate(patchContactSchema), patchContact)
router.delete('/:id', validate(vildateId, "params"), deleteContactReq)
exports.contactsRouter = router