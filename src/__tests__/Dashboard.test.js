import { render, screen } from "@testing-library/react";
import Dashboard from "../pages/Dashboard";
import { BrowserRouter } from "react-router-dom"; 



test("track new app button shows up on dashboard", () => {

    render(
        <BrowserRouter>
            <Dashboard />
        </BrowserRouter>
    );

    // button should be displayed on homepage
    const button = screen.getByTestId('track-app-btn');
    expect(button).toBeInTheDocument();
    // button should have href attribute and link to add application page
    expect(button).toHaveAttribute('href', '/add-application');
});