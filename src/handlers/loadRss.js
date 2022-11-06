/* eslint-disable no-param-reassign */
import axios from 'axios';
import parserRss from '../parsers/parserRss';
import watcher from '../view/watchers.js';
import getIdForTopics from './getIdForTopics';
import { handlerOfLinkOpeningBtn, handlerOfOpenModalWindow } from './modalWindow.js';

const loadRss = (url, state, i18n) => {
  const proxy = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);

  watcher(state, i18n).loading = 'sending';
  axios.get(proxy)
    .then((response) => parserRss(response))
    .then(({ feed, topics }) => {
      state.rssContent.resources.unshift(url);
      state.rssContent.feeds.unshift(feed);
      state.rssContent.topics.unshift(...topics);
      getIdForTopics(state.rssContent.topics);

      state.feedback = 'loading.isLoaded';
      watcher(state, i18n).loading = 'finished';
      handlerOfLinkOpeningBtn(state, i18n);
      handlerOfOpenModalWindow(state, i18n);
    })
    .catch((error) => {
      switch (error.message) {
        case 'Network Error':
          state.feedback = 'loading.errors.errorNetWork';
          break;
        case 'Parsing Error':
          state.feedback = 'loading.errors.errorResource';
          break;
        default:
          throw new Error();
      }
      watcher(state, i18n).loading = 'failed';
      throw new Error();
    });
};

export default loadRss;
