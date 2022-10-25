import onChange from 'on-change';
import renderFeedback from '../renders/renderFeedback.js';
import { renderFeeds, renderPosts } from '../renders/renderRssContent.js';

export const watcherFeedback = (state) => {
  const watcher = onChange(state, (path, value) => {
    if (value === null) return;
    renderFeedback(value, state.feedback);
    watcher[path] = null;
  });

  return watcher;
};

export const watcherLoadingRss = (state) => {
  const watcher = onChange(state, (path, value) => {
    if (value === null) return;
    if (value) {
      renderFeeds(state);
      renderPosts(state.rssContent.topics, state);
    }
    renderFeedback(value, state.feedback);
    watcher[path] = null;
  });

  return watcher;
};
