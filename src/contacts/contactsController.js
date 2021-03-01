const { ContactModel } = require('./contactsModel')
exports.createContact = async (req, res, next) => {
    try {
        const newContact = await ContactModel.create(req.body)
        return res.status(201).send(newContact)
    } catch (error) {
        next(error)
    }
}
exports.getContactsList = async (req, res, next) => {
    try {
        let list = await ContactModel.find()
        if (list.length === 0) {
            return res.status(400).send('You dont have any contacts')
        }
        return res.status(200).send(list)
    } catch (error) {
        next(error)
    }
}
exports.getContactById = async (req, res, next) => {
    try {
        let contact = await ContactModel.findById(req.params.id)
        if (!contact) {
            return res.status(400).send('{ "message": "Not found" }')
        }
        return res.status(200).send(contact)
    } catch (error) {
        next(error)
    }
}
exports.deleteContactReq = async (req, res, next) => {
    try {
        let contact = await ContactModel.findByIdAndDelete(req.params.id)
        if (!contact) {
            return res.status(400).send('{ "message": "Not found" }')
        }
        return res.status(200).send('{ "message": "contact deleted" }')
    } catch (error) {
        next(error)
    }
}
exports.patchContact = async (req, res, next) => {
    try {
        let contact = await ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!contact) {
            return res.status(400).send('{ "message": "Not found" }')
        }
        return res.status(200).send(contact)
    } catch (error) {
        next(error)
    }
}