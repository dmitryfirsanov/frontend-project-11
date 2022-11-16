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
import view from './view.js';

const validateForm = (content, listOfFeeds) => {
  yup.setLocale({
    mixed: {
      notOneOf: 'validation.errors.errorUniqRssUrl',
    },
    string: {
      url: 'validation.errors.errorURL',
      min: 'validation.errors.errorRequired',
    },
  });

  const schema = yup.string().url().min(1).notOneOf(listOfFeeds);

  return schema.validate(content);
};

const setIdForTopics = (topics) => {
  topics.forEach((topic) => {
    topic.id = uniqueId();
  });
};

const handlerOfTheReadPost = (watcher) => {
  document.querySelector('.posts').addEventListener('click', (e) => {
    console.log('click');
    const { id } = e.target.dataset;
    watcher.uiState.isRead.push(id);
  });
};

const openModalWindow = (state, watcher) => {
  const modal = document.getElementById('modal');
  modal.addEventListener('show.bs.modal', (e) => {
    const button = e.relatedTarget;
    const { id } = button.dataset;
    const currentPost = state.rssContent.topics.find((topic) => topic.id === id);
    watcher.uiState.viewedPost = currentPost;
  });
};

const addRss = (state, watcher) => {
  const form = document.querySelector('.rss-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const content = formData.get('url');

    validateForm(content, state.rssContent.resources)
      .then(() => {
        watcher.rssContent.loading = 'sending';
        const proxy = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${content}`);
        return axios.get(proxy);
      })
      .then((response) => parserRss(response))
      .then(({ feed, topics }) => {
        state.rssContent.resources.unshift(content);
        state.rssContent.feeds.unshift(feed);

        setIdForTopics(topics);
        state.rssContent.topics.unshift(...topics);

        state.isError = false;
        watcher.feedback = 'loading.isLoaded';
        watcher.rssContent.loading = 'finished';

        handlerOfTheReadPost(watcher);
        openModalWindow(state, watcher);
      })
      .catch((error) => {
        state.isError = true;
        switch (error.name) {
          case 'AxiosError':
            watcher.feedback = 'loading.errors.errorNetWork';
            break;
          case 'ParsingError':
            watcher.feedback = 'loading.errors.errorResource';
            break;
          case 'ValidationError':
            watcher.feedback = error.message;
            break;
          default:
            throw new Error('UnknownError');
        }
        watcher.rssContent.loading = 'failed';
      });
  });
};

const updateRss = (state, watcher) => {
  const proxy = 'https://allorigins.hexlet.app/get?disableCache=true&url=';

  // eslint-disable-next-line arrow-body-style
  const promises = state.rssContent.resources.map((resource) => {
    return axios.get(`${proxy}${resource}`)
      .then((response) => parserRss(response))
      .catch((error) => {
        switch (error.name) {
          case 'AxiosError':
            state.feedback = 'update.errors.errorNetWork';
            break;
          case 'ParsingError':
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

        setIdForTopics(newTopics);
        state.rssContent.topics.unshift(...newTopics);

        watcher.rssContent.updating = 'updated';

        handlerOfTheReadPost(watcher);
        openModalWindow(state, watcher);
      });
    });

  setTimeout(() => updateRss(state, watcher), 5000);
};

export default () => {
  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: true,
    resources: languages.ru,
  });

  const state = {
    feedback: '',
    isError: null,
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

  const watcher = view(state, i18n);
  addRss(state, watcher);
  updateRss(state, watcher);
};
