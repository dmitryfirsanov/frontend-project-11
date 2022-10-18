import onChange from 'on-change';
import renderFeedback from '../renders/renderFeedback.js';
import renderRssContent from '../renders/renderRssContent.js';

export default (state) => {
  const wathcer = onChange(state, (path, value) => {
    if (value === null) return;
    renderFeedback(value, state.feedback);
    if (path === 'isLoaded' && value) {
      renderRssContent(state);
    }
    wathcer[path] = null;
  });

  return wathcer;
};
