/* eslint-disable no-param-reassign */
import { watcherModalWindow } from '../view/watchers.js';

export const handlerOfLinkOpeningBtn = (state) => {
  document.querySelectorAll('.posts a').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const link = e.target.href;
      const { id } = e.target.dataset;
      watcherModalWindow(state.uiState).isRead.push(id);
      window.open(link);
    });
  });
};

export const handlerOfOpenModalWindow = (state) => {
  const modal = document.getElementById('modal');
  modal.addEventListener('show.bs.modal', (e) => {
    const button = e.relatedTarget;
    const { id } = button.dataset;
    const currentPost = state.rssContent.posts.find((post) => post.id === id);
    watcherModalWindow(state.uiState).viewedPost = currentPost;
    watcherModalWindow(state.uiState).isRead.push(id);
  });
};
