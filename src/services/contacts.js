import ContactCollection from '../db/models/contact.js';

export const getContacts = () => ContactCollection.find();

export const getContact = async (id) => ContactCollection.findById(id);
