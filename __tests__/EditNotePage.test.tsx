import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import EditNote from "../src/pages/EditNotePage";
import { useNotesStore } from "../src/store/useNotesStore";
import React from "react";

// Mock Zustand store
jest.mock("../src/store/useNotesStore", () => ({
  useNotesStore: jest.fn(),
}));

describe("EditNotePage", () => {
  const mockUpdateNote = jest.fn();
  const mockAddNote = jest.fn();
  const mockGetNote = jest.fn();

  beforeEach(() => {
    (useNotesStore as unknown as jest.Mock).mockReturnValue({
      note: { id: "1", title: "Note 1", content: "Content 1" },
      getNote: mockGetNote,
      addNote: mockAddNote,
      updateNote: mockUpdateNote,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Edit Note heading", () => {
    render(
      <BrowserRouter>
        <EditNote />
      </BrowserRouter>
    );

    expect(screen.getByText(/Edit Note/i)).toBeInTheDocument();
  });

  it("renders the note title and content", () => {
    render(
      <BrowserRouter>
        <EditNote />
      </BrowserRouter>
    );

    expect(screen.getByDisplayValue("Note 1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Content 1")).toBeInTheDocument();
  });
});
