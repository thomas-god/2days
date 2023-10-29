const states = ["DONE", "NOT_DONE", "PENDING"] as const;
export type State = typeof states[number];

export const toggleState = (state: State): State => {
  switch (state) {
    case "DONE":
      return "NOT_DONE";
    case "NOT_DONE":
      return "DONE";
    case "PENDING":
      return "DONE";
  }
};
