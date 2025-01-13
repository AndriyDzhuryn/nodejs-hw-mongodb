import { SORT_ORDER } from '../constans/contacts.js';
import ContactCollection from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 4,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactCollection.find();
  const contactsItems = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();
  const data = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsItems, page, perPage);
  return {
    data,
    ...paginationData,
  };
};

export const getContact = async (id) => ContactCollection.findById(id);

export const createContact = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const result = await ContactCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!result || !result.value) return null;
  return {
    contact: result.value,
  };
};

export const deleteContact = async (contactId) => {
  const contact = await ContactCollection.findOneAndDelete({ _id: contactId });
  return contact;
};
