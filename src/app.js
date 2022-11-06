import './styles.scss';
import 'bootstrap';
import i18next from 'i18next';
import languages from './locales/languages.js';
import addRss from './handlers/addRss';
import updateRss from './handlers/updateRss';

const i18n = i18next.createInstance();
i18n.init({
  lng: 'ru',
  debug: true,
  resources: languages.ru,
});

const state = {
  feedback: '',
  isValid: null,
  rssContent: {
    loading: null,
    updating: null,
    resources: [],
    feeds: [],
    topics: [],
  },
  uiState: {
    viewedPost: {},
    isRead: [],
  },
};

export default () => {
  addRss(state, i18n);
  updateRss(state, i18n);
};
