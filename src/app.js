/* eslint-disable no-param-reassign */
import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import {
  uniqueId, differenceWith, isEqual, isEmpty,
} from 'lodash';
import axios from 'axios';
import i18next from 'i18next';
import languages from './locales/languages.js';
import parserRss from './parserRss.js';
import watcher from './view.js';

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

const validateForm = (content, listOfFeeds) => {
  yup.setLocale({
    mixed: {
      notOneOf: 'validation.errors.errorUniqRssUrl',
    },
    string: {
      url: 'validation.errors.errorURL',
      min: 'validation.errors.errorRequared',
    },
  });

  const schema = yup.string().url().min(1).notOneOf(listOfFeeds);

  return schema.validate(content);
};

const getIdForTopics = (topics) => {
  topics.forEach((topic) => {
    if (!Object.prototype.hasOwnProperty.call(topic, 'id')) {
      topic.id = uniqueId();
    }
  });
};

const handlerOfLinkOpeningBtn = () => {
  document.querySelectorAll('.posts a').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const { id } = e.target.dataset;
      watcher(state.uiState, i18n).isRead.push(id);
    });
  });
};

const handlerOfOpenModalWindow = () => {
  const modal = document.getElementById('modal');
  modal.addEventListener('show.bs.modal', (e) => {
    const button = e.relatedTarget;
    const { id } = button.dataset;
    const currentPost = state.rssContent.topics.find((topic) => topic.id === id);
    watcher(state.uiState, i18n).viewedPost = currentPost;
    watcher(state.uiState, i18n).isRead.push(id);
  });
};

const updateRss = () => {
  const proxy = 'https://allorigins.hexlet.app/get?disableCache=true&url=';

  // eslint-disable-next-line arrow-body-style
  const promises = state.rssContent.resources.map((resource) => {
    return axios.get(`${proxy}${resource}`)
      .then((response) => parserRss(response))
      .catch((error) => {
        switch (error.message) {
          case 'Network Error':
            state.feedback = 'update.errors.errorNetWork';
            break;
          case 'Parsing Error':
            state.feedback = 'update.errors.errorResource';
            break;
          default:
            throw new Error();
        }
      });
  });

  Promise.all(promises)
    .then((parsedRss) => {
      parsedRss.forEach(({ topics }) => {
        const oldTopicsLinks = state.rssContent.topics.map((topic) => topic.link);
        const allTopicsLinks = topics.map((topic) => topic.link);
        const newTopicsLinks = differenceWith(allTopicsLinks, oldTopicsLinks, isEqual);
        if (isEmpty(newTopicsLinks)) return;

        const newTopics = newTopicsLinks
          .map((link) => topics.find((topic) => topic.link === link));

        state.rssContent.topics.unshift(...newTopics);
        getIdForTopics(state.rssContent.topics);
        watcher(state, i18n).updating = 'updated';
        handlerOfLinkOpeningBtn();
        handlerOfOpenModalWindow();
      });
    });

  setTimeout(() => updateRss(), 5000);
};

const addRss = () => {
  const form = document.querySelector('.rss-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const content = formData.get('url');

    validateForm(content, state.rssContent.resources)
      .then(() => {
        watcher(state, i18n).loading = 'sending';
        const proxy = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${content}`);
        return axios.get(proxy);
      })
      .then((response) => parserRss(response))
      .then(({ feed, topics }) => {
        state.rssContent.resources.unshift(content);
        state.rssContent.feeds.unshift(feed);
        state.rssContent.topics.unshift(...topics);
        getIdForTopics(state.rssContent.topics);

        state.isValid = true;
        watcher(state, i18n).feedback = 'loading.isLoaded';
        watcher(state, i18n).loading = 'finished';
        handlerOfLinkOpeningBtn();
        handlerOfOpenModalWindow();
      })
      .catch((error) => {
        console.log(error.message);
        state.isValid = false;
        switch (error.name) {
          case 'AxiosError':
            watcher(state, i18n).feedback = 'loading.errors.errorNetWork';
            break;
          case 'ParsingError':
            watcher(state, i18n).feedback = 'loading.errors.errorResource';
            break;
          case 'ValidationError':
            watcher(state, i18n).feedback = error.message;
            break;
          default:
            throw new Error('UnknownError');
        }
        watcher(state, i18n).loading = 'failed';
        state.feedback = error.message;
      });
  });
};

export default () => {
  addRss();
  updateRss();
};
