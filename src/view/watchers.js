import onChange from 'on-change';
import renderFeedback from '../renders/renderFeedback.js';
import { renderFeeds, renderPosts } from '../renders/renderRssContent.js';
import renderModalWindow from '../renders/renderModalWindow.js';
import renderOfReadPosts from '../renders/renderOfReadPosts.js';
import { lockForm, unlockForm } from '../renders/renderBlockForm.js';

export default (state, i18n) => {
  const watcher = onChange(state, (path, value) => {
    switch (path) {
      case 'isValid':
        renderFeedback(value, state.feedback, i18n);
        break;
      case 'loading':
        switch (value) {
          case 'sending':
            lockForm();
            break;
          case 'finished':
            renderFeeds(state, i18n);
            renderPosts(state, i18n);
            renderFeedback(true, state.feedback, i18n);
            unlockForm();
            break;
          case 'failed':
            renderFeedback(false, state.feedback, i18n);
            unlockForm();
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
