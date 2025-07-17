import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";
import { BrowserRouter } from "react-router-dom"; //needed since navbar component uses Link



test("navbar has correct pages: Dashboard, Calendar, Job Search, Logout", () => {
    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );


    // text shown in navbar
    const dash = screen.getByText(/Dashboard/i);
    const cal = screen.getByText(/Calendar/i);
    const jobsearch = screen.getByText(/Job Search/i);
    const logout = screen.getByText(/Logout/i);

    // elements are in the document
    expect(dash).toBeInTheDocument();
    expect(cal).toBeInTheDocument();
    expect(jobsearch).toBeInTheDocument();
    expect(logout).toBeInTheDocument();

    // each should link to their respective page
    expect(dash).toHaveAttribute('href', '/dashboard');
    expect(cal).toHaveAttribute('href', '/calendar');
    expect(jobsearch).toHaveAttribute('href', '/jobsearch');
    expect(logout).toHaveAttribute('href', '/');
});