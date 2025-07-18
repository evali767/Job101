import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login"; // update path accordingly

describe("Login typing only", () => {
  it("allows typing in email and password fields", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "securepass" } });

    expect(emailInput.value).toBe("user@example.com");
    expect(passwordInput.value).toBe("securepass");
  });
});