import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
import AddApplication from '../pages/AddApplication';

import Dashboard from '../pages/Dashboard';


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

window.alert = jest.fn();

jest.mock('../pages/Dashboard', () => {
    return function MockDashboard() {
        return <h1>Dashboard</h1>;
    };
});

jest.mock('../firebase', () => ({
    auth: {
        currentUser: { uid: 'test-user-id' }
    },
    db: {}
}));

jest.mock('firebase/firestore', () => ({
    addDoc: jest.fn().mockResolvedValue({}),
    collection: jest.fn()
}));


jest.mock('firebase/auth', () => ({
    onAuthStateChanged: jest.fn((auth, callback) => {
    callback({ uid: 'test-user-id' });
    return jest.fn();
})
}));


test('fails to submit when only company is filled', () => {
    const testCompany = 'My Company';

    render(
        <BrowserRouter>
            <AddApplication />
        </BrowserRouter>
    );

    const textInputs = screen.getAllByRole('textbox');

    const companyInput = textInputs[0]; 
    const positionInput = textInputs[1];

    fireEvent.change(companyInput, { target: { value: testCompany } });

    expect(positionInput.value).toBe('');

    const submitButton = screen.getByRole('button')

    fireEvent.click(submitButton)

    expect(positionInput).toBeRequired();
    expect(positionInput.value).toBe('');
})

test('submits successfully when all fields are filled', async () => {
    const testCompany = 'My Company';
    const testPosition = 'My Position';
    const testJobPostingLink = 'https://example.com/job-posting';
    const testDate = '2025-07-17';

    render(
        <MemoryRouter initialEntries={['/add-application']}>
            <Routes>
                <Route path="/add-application" element={<AddApplication />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </MemoryRouter>
    );

    const textInputs = screen.getAllByRole('textbox');

    const companyInput = textInputs[0]; 
    const positionInput = textInputs[1];
    const JobPostingLinkInput = textInputs[2];

    fireEvent.change(companyInput, { target: { value: testCompany } });
    fireEvent.change(positionInput, { target: { value: testPosition } });
    fireEvent.change(JobPostingLinkInput, { target: { value: testJobPostingLink } });

    const dateInput = document.querySelector('input[type="date"]');
    fireEvent.change(dateInput, { target: { value: testDate } });

    const submitButton = screen.getByRole('button');

    
    await act(async () => {
        fireEvent.click(submitButton);
    });
    
 
        const dashboardTitle = document.querySelector('h1');
        console.log(dashboardTitle.textContent);
        expect(dashboardTitle.textContent).toBe("Dashboard");

})