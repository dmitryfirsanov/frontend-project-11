/* eslint-disable no-param-reassign */
import validateForm from '../validators/formValidator.js';
import loadRss from './loadRss.js';

export default (watcherRss, watcherUpdateRss, state) => {
  const form = document.querySelector('.rss-form');
  const input = document.querySelector('#url-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const content = input.value;

    validateForm(state.i18next, content, state.resources)
      .catch((error) => {
        state.feedback = error.message;
        watcherRss.isValid = false;
        throw new Error();
      })
      .then(() => {
        loadRss(watcherRss, watcherUpdateRss, content, state);
      });
  });
};
