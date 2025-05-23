import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

test('renders header title', () => {
  render(<Header onToggleDiscoveryPanel={() => {}} />);
  expect(screen.getByText('London History Explorer')).toBeInTheDocument();
});
