/* eslint-disable no-param-reassign */
import validateForm from '../validators/formValidator.js';
import loadRss from './loadRss.js';
import watcher from '../view/watchers.js';

export default (state, i18n) => {
  const form = document.querySelector('.rss-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const content = formData.get('url');

    validateForm(content, state.rssContent.resources)
      .then(() => {
        loadRss(content, state, i18n);
      })
      .catch((error) => {
        state.feedback = error.message;
        watcher(state, i18n).isValid = false;
        watcher(state, i18n).isValid = null;
        throw new Error();
      });
  });
};
