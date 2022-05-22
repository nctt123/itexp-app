import { createSelector } from "reselect";

const homeSelector = (state) => state.home;

export const SocketIoSelector = createSelector(
  homeSelector,
  (homeReducer) => homeReducer.socketIo
);

export const loadingCreatePostSelector = createSelector(
  homeSelector,
  (homeReducer) => homeReducer.loadingCreatePost
);

export const loadingFetchPostSelector = createSelector(
  homeSelector,
  (homeReducer) => homeReducer.loadingPost
);

export const postSelector = createSelector(
  homeSelector,
  (homeReducer) => homeReducer.post
);

export const loadingLoadMoreSelector = createSelector(
  homeSelector,
  (homeReducer) => homeReducer.loadingLoadMore
);

export const loadMorePostOffset = createSelector(
  homeSelector,
  (homeReducer) => homeReducer.loadMoreOffset
);

export const refreshSelector = createSelector(
  homeSelector,
  (homeReducer) => homeReducer.refresh
);
