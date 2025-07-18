import React from 'react';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import BugList from '../../components/BugList';

jest.mock('axios');

const mockBugs = [
  { _id: '1', title: 'Bug 1', status: 'open' },
  { _id: '2', title: 'Bug 2', status: 'in-progress' },
];

describe('BugList', () => {
  it('renders list of bugs', () => {
    render(<BugList bugs={mockBugs} setBugs={() => {}} />);
    expect(screen.getByText(/bug 1/i)).toBeInTheDocument();
    expect(screen.getByText(/bug 2/i)).toBeInTheDocument();
  });

  it('updates status on select change', async () => {
    const setBugs = jest.fn();
    axios.patch.mockResolvedValueOnce({
      data: { _id: '1', title: 'Bug 1', status: 'resolved' },
    });

    render(<BugList bugs={mockBugs} setBugs={setBugs} />);
    fireEvent.change(screen.getAllByRole('combobox')[0], {
      target: { value: 'resolved' },
    });

    await waitFor(() =>
      expect(setBugs).toHaveBeenCalledWith([
        { _id: '1', title: 'Bug 1', status: 'resolved' },
        { _id: '2', title: 'Bug 2', status: 'in-progress' },
      ])
    );
  });

  it('deletes bug on delete button click', async () => {
    const setBugs = jest.fn();
    axios.delete.mockResolvedValueOnce({});

    render(<BugList bugs={mockBugs} setBugs={setBugs} />);
    fireEvent.click(screen.getAllByRole('button', { name: /delete/i })[0]);

    await waitFor(() =>
      expect(setBugs).toHaveBeenCalledWith([
        { _id: '2', title: 'Bug 2', status: 'in-progress' },
      ])
    );
  });
});
