import { render, screen } from '@testing-library/react';
import App from './App';
import Board from './components/Board'

test('renders learn react link', () => {
  render(<App />);
  const board = screen
  console.log(board)
  expect(linkElement).toBeInTheDocument();
});
