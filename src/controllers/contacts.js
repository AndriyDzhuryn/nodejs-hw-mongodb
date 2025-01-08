import createHttpError from 'http-errors';

import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
} from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const data = await getContacts();

  res.json({ status: 200, message: 'Successfully found contacts!', data });
};

export const getContactController = async (req, res) => {
  const data = await getContact(req.params.contactId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${req.params.contactId}!`,
    data,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, `Contact not found`));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.status(204).send();
};
