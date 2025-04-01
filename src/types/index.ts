import store from "@/stores";

export interface PaginationProps {
  limit: number;
  pageNo: number;
  searchKeyword: string;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

