/* eslint-disable no-param-reassign */
import validateForm from '../validators/formValidator.js';
import loadRss from './loadRss.js';
import { watcherFeedback } from '../view/watchers.js';

export default (state) => {
  const form = document.querySelector('.rss-form');
  const input = document.querySelector('#url-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const content = input.value;

    validateForm(state.i18next, content, state.rssContent.resources)
      .catch((error) => {
        state.feedback = error.message;
        watcherFeedback(state).isValid = false;
        throw new Error();
      })
      .then(() => {
        loadRss(content, state);
      });
  });
};
