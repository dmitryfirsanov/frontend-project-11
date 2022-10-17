/* eslint-disable no-param-reassign */
import validateForm from '../validators/formValidator.js';
import loadRss from './loadRss.js'

export default (state, watcherValidationURL) => {
  const form = document.querySelector('.rss-form');
  const input = document.querySelector('#url-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const content = input.value;

    validateForm(state.i18next, content, state.feeds)
      .catch(({ message }) => {
        throw new Error(message);
      })
      .then(() => {
        state.feeds.push(content);
        state.feedback = state.i18next.t('loading.isLoaded');
        watcherValidationURL.isValid = true;
      })
      .catch(({ message }) => {
        state.feedback = message;
        watcherValidationURL.isValid = false;
      });
  });
};
