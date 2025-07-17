import '@testing-library/jest-dom';

import {render, fireEvent, screen} from '@testing-library/react';

import { BrowserRouter } from 'react-router';

import AddApplication from "../pages/AddApplication";

window.alert = jest.fn();

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