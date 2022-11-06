/* eslint-disable no-param-reassign */
import watcher from '../view/watchers.js';

export const handlerOfLinkOpeningBtn = (state, i18n) => {
  document.querySelectorAll('.posts a').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const { id } = e.target.dataset;
      watcher(state.uiState, i18n).isRead.push(id);
    });
  });
};

export const handlerOfOpenModalWindow = (state, i18n) => {
  const modal = document.getElementById('modal');
  modal.addEventListener('show.bs.modal', (e) => {
    const button = e.relatedTarget;
    const { id } = button.dataset;
    const currentPost = state.rssContent.topics.find((topic) => topic.id === id);
    watcher(state.uiState, i18n).viewedPost = currentPost;
    watcher(state.uiState, i18n).isRead.push(id);
  });
};
