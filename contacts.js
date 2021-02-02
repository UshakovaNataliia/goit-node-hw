const { promises: fsPromises } = require('fs');
const path = require('path');
const nanoid = require('nanoid');
const contactsPath = path.join(__dirname, './db/contacts.json');

function listContacts() {
    fsPromises.readFile(contactsPath, 'utf-8')
        .then(data => console.table(JSON.parse(data)))
        .catch(err=>console.log(err));
}

function getContactById(contactId) {
    fsPromises.readFile(contactsPath, 'utf-8')
        .then(data => {
            JSON.parse(data).filter(contact => {
                if (contact.id === contactId) {
                 console.log(contact);   
                }
            })
        })
        .catch(err=>console.log(err));
}

function removeContact(contactId) {
     fsPromises.readFile(contactsPath, 'utf-8')
        .then(data => {
            const newData = JSON.stringify(JSON.parse(data).filter(contact => contact.id !== contactId))
            fsPromises.writeFile(contactsPath, newData)
            console.table(JSON.parse(newData));
        })
        .catch(err=>console.log(err));   
}

function addContact(name, email, phone) {
    const id = nanoid.nanoid(3);
    const newContact = {
        id,
        name,
        email,
        phone
    }
    fsPromises.readFile(contactsPath, 'utf-8')
        .then(data => {
            const newData = JSON.stringify([...(JSON.parse(data)), newContact]);
            fsPromises.writeFile(contactsPath, newData)
            .catch(err=>console.log(err))
            console.table(JSON.parse(newData));
            console.log(newContact);
        })
        .catch(err => console.log(err));
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}