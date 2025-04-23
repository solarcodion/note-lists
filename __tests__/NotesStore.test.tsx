import axios from "axios";
import { act } from "react";
import { useNotesStore } from "../src/store/useNotesStore";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

describe("useNotesStore", () => {
  const mockNotes = [
    { id: "1", title: "Note 1", content: "Content 1", timestamp: "2023-01-01" },
  ];

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        notes: mockNotes,
        totalCount: 1,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches notes and updates the store", async () => {
    const store = useNotesStore.getState();
    await act(async () => {
      await store.fetchNotes();
    });

    expect(store.notes).toEqual(mockNotes);
  });
});
