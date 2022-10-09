import './styles.scss';
import * as yup from 'yup';
import onChange from 'on-change';
import render from './view/watcher.js';
import isEmpty from 'lodash/isEmpty.js';

const state = {
  valid: true,
  url: '',
  listOfFeeds: [],
  errors: [],
};

const input = document.querySelector('#url-input');
const submitButton = document.querySelector('[type="submit"]');

const watchedState = onChange(state, (path, value) => {
  if (value === true) {
    input.classList.remove('is-invalid');
  } else {
    input.classList.add('is-invalid');
  }
});

input.addEventListener('input', (e) => {
  state.url = e.target.value;
});

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  const schemaUrl = yup.string().url().min(1).notOneOf(state.listOfFeeds);
  schemaUrl.validate(state.url)
    .catch((err) => {
      state.errors = err.errors;
    })
    .then(() => {
      if (isEmpty(state.errors)) {
        state.listOfFeeds.push(state.url);
        watchedState.valid = true;
      }
      else watchedState.valid = false;

      render(state);
    })
    .then(() => {
      state.errors = [];
      state.url = '';
    })
});
