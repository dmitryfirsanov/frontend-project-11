/* eslint-disable no-param-reassign */
import axios from 'axios';
import { differenceWith, isEqual, isEmpty } from 'lodash';
import parserRSS from '../parsers/parserRss.js';
import watcher from '../view/watchers.js';
import getIdForTopics from './getIdForTopics.js';
import { handlerOfLinkOpeningBtn, handlerOfOpenModalWindow } from './modalWindow.js';

const updateRss = (state, i18n) => {
  const proxy = 'https://allorigins.hexlet.app/get?disableCache=true&url=';

  watcher(state, i18n).updating = 'requested';
  // eslint-disable-next-line arrow-body-style
  const promises = state.rssContent.resources.map((resource) => {
    return axios.get(`${proxy}${resource}`)
      .then((response) => parserRSS(response))
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
        watcher(state, i18n).updating = 'failed';
        throw new Error();
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
        handlerOfLinkOpeningBtn(state, i18n);
        handlerOfOpenModalWindow(state, i18n);
      });
    });

  setTimeout(() => updateRss(state, i18n), 5000);
};

export default updateRss;
