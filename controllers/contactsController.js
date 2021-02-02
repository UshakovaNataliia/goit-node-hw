const contacts = require('../models/Contacts.json');
const Joi = require('joi');
const nanoId = require('nanoid');
const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, '../models/Contacts.json');

class ContactsController {
  findContactIndex = contactId => {
    return contacts.findIndex(({ id }) => id === contactId);
  };
  listContacts(req, res) {
    res.json(contacts);
  }
  getById(req, res) {
    const {
      params: { contactId },
    } = req;
    const contactById = contacts.find(contact => contact.id === contactId);
    res.json(contactById);
  }

  addContact(req, res) {
    const { body } = req;

    const newContact = {
      id: nanoId(),
      ...body,
    };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    res.status(201).send(newContact);
  }

  removeContact = (req, res) => {
    const {
      params: { contactId },
    } = req;
    const index = this.findContactIndex(contactId);
    contacts.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    res.status(200).send({ message: 'Contact deleted' });
  };

  updateContacts = (req, res) => {
    const {
      params: { contactId },
    } = req;
    const index = this.findContactIndex(contactId);
    const updatedContacts = {
      ...contacts[index],
      ...req.body,
    };
    contacts[index] = updatedContacts;
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    res.status(201).send(updatedContact);
  };

  validateContact(req, res, next) {
    const {
      params: { contactId },
    } = req;
    const contactIndex = contacts.find(contact => contact.id === contactId);
    if (!contactIndex) {
      return res.status(404).send({ message: 'Not found' });
    }
    next();
  }

  validateCreateContact(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });

    const validationResult = validationRules.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send({ message: 'missing required name field' });
    }
    next();
  }

  validateUpdateContact(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    });

    const validationResult = validationRules.validate(req.body);
    if (validationResult.error || Object.entries(req.body).length === 0) {
      return res.status(400).send({ message: 'missing fields' });
    }
    next();
  }
}

module.exports = new ContactsController();