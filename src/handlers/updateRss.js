/* eslint-disable no-param-reassign */
import axios from 'axios';
import { differenceWith, isEqual, isEmpty } from 'lodash';
import parserRSS from '../parsers/parserRss.js';
import getIdForTopics from './getIdForTopics.js';
import { renderPosts } from '../renders/renderRssContent.js';

const updateRss = (state) => {
  setTimeout(() => {
    const proxy = 'https://allorigins.hexlet.app/get?disableCache=true&url=';

    // eslint-disable-next-line arrow-body-style
    const promises = state.rssContent.resources.map((resource) => {
      return axios.get(`${proxy}${resource}`)
        .catch(() => {
          state.feedback = state.i18next.t('loading.errors.errorNetWork');
          throw new Error();
        })
        .then((response) => parserRSS(response))
        .catch(() => {
          state.feedback = state.i18next.t('loading.errors.errorResource');
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
          renderPosts(state.rssContent.topics, state);
        });
      })
      .then(() => {
        updateRss(state);
      })
      .catch(() => {
        updateRss(state);
      });
  }, 5000);
};

export default updateRss;
