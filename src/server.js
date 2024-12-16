import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env.js';
import { getContact, getContacts } from './services/contacts.js';

const PORT = Number(env('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    const data = await getContacts();

    res.json({ status: 200, message: 'Successfully found contacts!', data });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const data = await getContact(req.params.contactId);

    if (!data) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    res.json({
      status: 200,
      message: 'Successfully found contact with id {contactId}!',
      data,
    });
  });

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
