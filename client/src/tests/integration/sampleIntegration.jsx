import { render, screen } from '@testing-library/react';
import App from '../../App';
import { describe, test, expect } from 'vitest';

describe('App Integration', () => {
  test('renders main title', () => {
    render(<App />);
    expect(screen.getByText(/Bug Tracker/i)).toBeInTheDocument();
  });
});
