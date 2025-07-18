import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import BugForm from '../../components/BugForm';

jest.mock('axios');

describe('BugForm', () => {
  it('renders and submits form successfully', async () => {
    const onBugAdded = jest.fn();
    axios.post.mockResolvedValueOnce({
      data: { _id: '1', title: 'Test bug', status: 'open' },
    });

    render(<BugForm onBugAdded={onBugAdded} />);

    fireEvent.change(screen.getByPlaceholderText(/bug title/i), {
      target: { value: 'Test bug' },
    });
    fireEvent.click(screen.getByRole('button', { name: /report bug/i }));

    await waitFor(() => expect(onBugAdded).toHaveBeenCalledWith({
      _id: '1',
      title: 'Test bug',
      status: 'open',
    }));
  });

  it('shows error when title is empty', () => {
    const onBugAdded = jest.fn();
    render(<BugForm onBugAdded={onBugAdded} />);

    fireEvent.click(screen.getByRole('button', { name: /report bug/i }));

    expect(screen.getByText(/bug title is required/i)).toBeInTheDocument();
  });
});
