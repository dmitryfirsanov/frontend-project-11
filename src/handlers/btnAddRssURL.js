/* eslint-disable no-param-reassign */
import validateForm from '../validators/formValidator.js';
import loadRss from './loadRss.js'

export default (state, watcher) => {
  const form = document.querySelector('.rss-form');
  const input = document.querySelector('#url-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const content = input.value;

    validateForm(state.i18next, content, state.feeds)
      .then(() => {
        loadRss(content, state, watcher);
      })
      .catch(({ message }) => {
        state.feedback = message;
        watcher.isValid = false;
      })
      .then
  });
};
