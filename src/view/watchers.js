import onChange from 'on-change';
import renderFeedback from '../renders/renderFeedback.js';
import renderNewTopics from '../renders/renderNewTopics.js';
import renderRssContent from '../renders/renderRssContent.js';

export const watcherRss = (state) => {
  const watcher = onChange(state, (path, value) => {
    if (value === null) return;
    renderFeedback(value, state.feedback);
    if (path === 'isLoaded' && value) {
      renderRssContent(state);
    }
    watcher[path] = null;
  });

  return watcher;
};

export const watcherUpdateRss = (state) => {
  const watcher = onChange(state, (path, value) => {
    renderNewTopics(value, state);
  });

  return watcher;
};
