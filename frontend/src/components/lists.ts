import client from 'lib/api/client';

export const lists = () => {
  const list = client.get('/list');
  return list;
};
