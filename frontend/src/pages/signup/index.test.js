import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import SignUp from './index';

jest.mock('axios');

describe('SignUp page', () => {
  beforeEach(() => {
    axios.post.mockReset();
  });

  test('submits participant signup to /api/v1/auth/signup', async () => {
    axios.post.mockResolvedValue({ data: {} });

    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: 'Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password minimal 6 karakter/i), {
      target: { value: 'secret12' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'secret12' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringMatching(/\/api\/v1\/auth\/signup$/),
        expect.objectContaining({
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
        })
      )
    );
  });
});
