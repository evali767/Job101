import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddApplication from '../pages/AddApplication';

jest.mock('../components/Navbar', () => () => <div>Mock Navbar</div>);

jest.mock('../firebase', () => ({
  auth: { currentUser: { uid: 'mock-uid' } },
  db: {},
}));

describe('AddApplication Component', () => {
  it('loads the form fields', () => {
    render(
      <MemoryRouter>
        <AddApplication />
      </MemoryRouter>
    );

    const companyInput = screen.getByLabelText(/Company:/i);
    const positionInput = screen.getByLabelText(/Position:/i);
    const linkInput = screen.getByLabelText(/Job Posting Link:/i);
    const statusSelect = screen.getByLabelText(/Status:/i);
    const dateInput = screen.getByLabelText(/Date Applied:/i);

    fireEvent.change(companyInput, { target: { value: 'OpenAI' } });
    fireEvent.change(positionInput, { target: { value: 'AI Engineer' } });
    fireEvent.change(linkInput, { target: { value: 'https://openai.com/jobs' } });
    fireEvent.change(statusSelect, { target: { value: 'Interview' } });
    fireEvent.change(dateInput, { target: { value: '2025-07-18' } });

    expect(companyInput.value).toBe('OpenAI');
    expect(positionInput.value).toBe('AI Engineer');
    expect(linkInput.value).toBe('https://openai.com/jobs');
    expect(statusSelect.value).toBe('Interview');
    expect(dateInput.value).toBe('2025-07-18');
  });
});