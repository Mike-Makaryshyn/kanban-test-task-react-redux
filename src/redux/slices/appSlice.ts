import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Issue {
  node_id: string;
  state: "todo" | "in-progress" | "done";
}

interface AppState {
  todo: Issue[];
  inProgress: Issue[];
  done: Issue[];
}

const initialState: AppState = {
  todo: [],
  inProgress: [],
  done: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addIssues: (state, action: PayloadAction<Issue[]>) => {
      state.todo = action.payload;
    },
    moveIssue: (
      state,
      action: PayloadAction<{
        issueId: number | string;
        fromColumn: "todo" | "inProgress" | "done";
        toColumn: "todo" | "inProgress" | "done";
        toIndex: number;
      }>
    ) => {
      const { issueId, fromColumn, toColumn, toIndex } = action.payload;

      const issueToMove = state[fromColumn].find(
        (issue) => issue.node_id === issueId
      );

      if (issueToMove) {
        state[fromColumn] = state[fromColumn].filter(
          (issue) => issue.node_id !== issueId
        );
        state[toColumn].splice(toIndex, 0, issueToMove);
      }
    },
  },
});

export const { addIssues, moveIssue } = appSlice.actions;
export default appSlice.reducer;
