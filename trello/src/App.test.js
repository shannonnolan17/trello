import { render, screen } from '@testing-library/react';
import Board from './components/Board'

test('renders learn react link', () => {
  render(<Board />);
  const board = screen.getByText(/To Do/i);
  expect(board).toBeInTheDocument();
});
