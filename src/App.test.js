import { render, screen } from '@testing-library/react';
import Pokedex from './App';

test('renders learn react link', () => {
  render(<Pokedex />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
