import './styles.scss';
import i18next from 'i18next';
import languages from './locales/languages.js';
import app from './app';

const promise = new Promise((resolve) => {
  const i18Instance = i18next.createInstance();
  i18Instance.init({
    lng: 'ru',
    debug: true,
    resources: languages.ru,
  });
  resolve(i18Instance);
});

promise
  .then((i18Instance) => {
    const state = {
      i18next: i18Instance,
      feedback: '',
      feeds: [],
      isValid: null,
    };

    return state;
  })
  .then((state) => app(state));