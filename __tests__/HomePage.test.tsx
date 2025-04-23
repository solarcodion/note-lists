import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import { useNotesStore } from "../src/store/useNotesStore";
import React from "react";

// Mock Zustand store
jest.mock("../src/store/useNotesStore", () => ({
  useNotesStore: jest.fn(),
}));

const mockNotes = [
  { id: "1", title: "Note 1", content: "Content 1", timestamp: "2023-01-01" },
  { id: "2", title: "Note 2", content: "Content 2", timestamp: "2023-01-02" },
];

describe("HomePage", () => {
  beforeEach(() => {
    (useNotesStore as unknown as jest.Mock).mockReturnValue({
      notes: mockNotes,
      fetchNotes: jest.fn(() => {
        useNotesStore.setState({ notes: mockNotes });
      }),
      deleteNote: jest.fn(),
    });
  });

  it("renders the Notes heading", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Notes/i)).toBeInTheDocument();
  });

  it("renders a list of notes", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByText("Note 1")).toBeInTheDocument();
    expect(screen.getByText("Note 2")).toBeInTheDocument();
  });
});
