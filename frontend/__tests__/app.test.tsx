import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../pages/sample';
import { lists } from '../components/lists';
import client from '../lib/api/client';

const mockValue = { status: 200, data: { data: { attributes: { comment: 'Hello World!' } } } };
(client.get as jest.Mock) = jest.fn().mockReturnValue(mockValue);

describe('App', () => {
  test('renders App component', async () => {
    render(<App />);
    expect(await screen.findByText('Hello World!')).toBeInTheDocument();
  });
});

describe('lists', () => {
  test('lists', async () => {
    const result = await lists();
    expect(result.data.data.attributes.comment).toBe('Hello World!');
  });

  test('client', async () => {
    const result = await client.get('/list');
    expect(result.data.data.attributes.comment).toMatch('Hello World!');
  });
});
