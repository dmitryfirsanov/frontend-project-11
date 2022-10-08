import './styles.scss';
import * as yup from 'yup';
import onChange from 'on-change';
import render from './view/watcher.js';

const state = {
  valid: true,
  fields: {
    url: '',
  },
  urls: [],
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

const schema = yup.string().url().min(1);

input.addEventListener('input', (e) => {
  state.fields.url = e.target.value;
});

submitButton.addEventListener('click', async (e) => {
  e.preventDefault();
  state.errors = await schema.validate(state.fields.url)
    .catch((err) => err.errors);

  if (state.errors === state.fields.url && !state.urls.includes(state.fields.url)) {
    watchedState.valid = true;
    state.urls.push(state.fields.url);
  } else {
    watchedState.valid = false;
  }

  state.errors = [];
  console.log(state.urls);
  render(state);
});
