import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setStorage } from "../../utils/localStorageActions";

interface Issue {
  node_id: string;
  state: "todo" | "in-progress" | "done";
}

interface AppState {
  todo: Issue[];
  inProgress: Issue[];
  done: Issue[];
  repoLink: string;
}

const initialState: AppState = {
  todo: [],
  inProgress: [],
  done: [],
  repoLink: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    addIssues: (state, action: PayloadAction<Issue[]>) => {
      state.todo = action.payload;
      state.inProgress = [];
      state.done = [];
    },
    addLocalStorageIssues: (state, action: PayloadAction<AppState>) => {
      state.todo = action.payload.todo;
      state.inProgress = action.payload.inProgress;
      state.done = action.payload.done;
    },
    saveRepoLink: (state, action) => {
      state.repoLink = action.payload;
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
        setStorage(state.repoLink, state);
      }
    },
  },
});

export const { addIssues, addLocalStorageIssues, moveIssue, saveRepoLink } =
  appSlice.actions;
export default appSlice.reducer;
