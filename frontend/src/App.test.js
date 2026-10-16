import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Semina landing page', () => {
  render(<App />);
  const linkElement = screen.getByRole('link', { name: /Browse Now/i });
  expect(linkElement).toBeInTheDocument();
});
