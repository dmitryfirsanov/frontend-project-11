/* eslint-disable no-param-reassign */
import validateForm from '../validators/formValidator.js';

export default (state, watcherValidationURL) => {
  const form = document.querySelector('.rss-form');
  const input = document.querySelector('#url-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const content = input.value;

    validateForm(state.i18next, content, state.feeds)
      .catch(({ message }) => {
        const error = message;
        throw new Error(error);
      })
      .then(() => {
        state.feeds.push(content);
        state.feedback = state.i18next.t('validation.isValid');
        watcherValidationURL.isValid = true;
      })
      .catch((error) => {
        state.feedback = error.message;
        watcherValidationURL.isValid = false;
      });
  });
};
