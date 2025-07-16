import { createContext, useContext, useState, useRef, useEffect } from "react";

const DropdownContext = createContext({
  open: false,
  toggle: () => {},
  close: () => {},
});

export function Dropdown({ children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;

    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, toggle, close }}>
      <div
        ref={ref}
        style={{
          position: "relative",
          display: "inline-block",
          textAlign: "left",
        }}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownButton({ children }) {
  const { toggle } = useContext(DropdownContext);
  return (
    <button
      onClick={toggle}
      style={{
        backgroundColor: "#2563EB", // Tailwind's blue-600
        color: "white",
        padding: "0.8rem 1rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        border: "none",
        transition: "background-color 0.2s ease-in-out",
        margin: "0 0 15px 0",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#1D4ED8")} // blue-700
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#2563EB")}
    >
      {children}
    </button>
  );
}

export function DropdownItems({ children }) {
  const { open } = useContext(DropdownContext);
  if (!open) return null;

  return (
    <div
      style={{
        position: "absolute",
        marginTop: "0.5rem",
        width: "12rem",
        backgroundColor: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderRadius: "0.375rem",
        border: "1px solid #e5e7eb", // Tailwind's gray-200
        zIndex: 10,
        cursor: "pointer",
      }}
    >
      <ul style={{ paddingTop: "0.25rem", paddingBottom: "0.25rem", paddingLeft: 0, margin: 0 }}>
        {children}
      </ul>
    </div>
  );
}

export function DropdownItem({ children, onClick }) {
  const { close } = useContext(DropdownContext);
  const handleClick = () => {
    onClick?.();
    close();
  };

  return (
    <li
      onClick={handleClick}
      style={{
        padding: "0.5rem 1rem",
        cursor: "pointer",
        "list-style": "none",
        marginLeft: 0,
        paddingLeft: "1rem",
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#dbdbdbff")}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
    >
      {children}
    </li>
  );
}
