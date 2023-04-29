import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Issue {
  id: number;
  state: "todo" | "inProgress" | "done" | "open";
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
      action.payload.forEach((issue) => {
        console.log(issue.state);
        if (issue.state === "open") {
          state.todo.push(issue);
        } else {
          state.done.push(issue);
          state.inProgress.push(issue);
        }
      });
    },
    moveIssue: (
      state,
      action: PayloadAction<{
        issueId: number;
        fromColumn: "todo" | "inProgress" | "done";
        toColumn: "todo" | "inProgress" | "done";
        toIndex: number;
      }>
    ) => {
      const { issueId, fromColumn, toColumn, toIndex } = action.payload;
      const issueToMove = state[fromColumn].find(
        (issue) => issue.id === issueId
      );
      if (issueToMove) {
        state[fromColumn] = state[fromColumn].filter(
          (issue) => issue.id !== issueId
        );
        state[toColumn].splice(toIndex, 0, issueToMove);
      }
    },
  },
});

export const { addIssues, moveIssue } = appSlice.actions;
export default appSlice.reducer;
