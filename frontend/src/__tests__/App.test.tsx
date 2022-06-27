import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { lists } from '../lists';
import client from '../lib/api/client';

(client.get as jest.Mock) = jest.fn().mockReturnValue({ status: 200, data: { message: 'Hello World!' } });

describe('App', () => {
  test('renders App component', async () => {
    (lists as jest.Mock) = jest.fn().mockReturnValue({ status: 200, data: { message: 'Hello World!' } });
    render(<App />);
    expect(await screen.findByText('Hello World!')).toBeInTheDocument();
  });
});

describe('lists', () => {
  test('lists', async () => {
    const result = await lists();
    expect(result.data.message).toBe('Hello World!');
  });

  test('client', async () => {
    const result = await client.get('/list');
    expect(result.data.message).toMatch('Hello World!');
  });
});
