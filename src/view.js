import onChange from 'on-change';
import {
  renderFeedback, renderFeeds, renderOfReadPosts, renderPosts,
  renderModalWindow, renderLockForm, renderUnlockForm,
} from './render.js';

export default (state, i18n) => {
  const watcher = onChange(state, (path, value) => {
    switch (path) {
      case 'feedback':
        renderFeedback(state.isValid, value, i18n);
        break;
      case 'loading':
        switch (value) {
          case 'sending':
            renderLockForm();
            break;
          case 'finished':
            renderFeeds(state, i18n);
            renderPosts(state, i18n);
            renderUnlockForm();
            break;
          case 'failed':
            renderUnlockForm();
            break;
          default:
            throw new Error();
        }
        break;
      case 'updating':
        switch (value) {
          case 'requested':
            break;
          case 'updated':
            renderPosts(state, i18n);
            break;
          case 'failed':
            renderFeedback(false, state.feedback, i18n);
            break;
          default:
            throw new Error();
        }
        break;
      case 'viewedPost':
        renderModalWindow(value);
        break;
      case 'isRead': {
        renderOfReadPosts(value);
        break;
      }
      default:
        throw new Error();
    }
  });

  return watcher;
};
