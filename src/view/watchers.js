import onChange from 'on-change';
import renderFeedback from '../renders/renderFeedback.js';
import { renderFeeds, renderPosts } from '../renders/renderRssContent.js';
import renderModalWindow from '../renders/renderModalWindow.js';
import renderOfReadPosts from '../renders/renderOfReadPosts.js';
import { lockForm, unlockForm } from '../renders/renderBlockForm.js';

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
      renderPosts(state.rssContent.posts, state);
    }
    renderFeedback(value, state.feedback);
    watcher[path] = null;
  });

  return watcher;
};

export const watcherModalWindow = (state) => {
  const watcher = onChange(state, (path, value) => {
    switch (path) {
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

export const watcherActivityButton = (state) => {
  const watcher = onChange(state, (path, value) => {
    switch (value) {
      case true:
        lockForm();
        break;
      case false:
        unlockForm();
        break;
      default:
        throw new Error();
    }
  });

  return watcher;
};
