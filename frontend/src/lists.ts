import client from 'lib/api/client';

export const lists = () => {
  return client.get('/list');
};
