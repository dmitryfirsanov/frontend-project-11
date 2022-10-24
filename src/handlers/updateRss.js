/* eslint-disable no-param-reassign */
import axios from 'axios';
import { differenceWith, isEqual, isEmpty } from 'lodash';
import parserRSS from '../parsers/parserRss.js';
import renderNewTopics from '../renders/renderNewTopics.js';

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
          const newTopics = differenceWith(topics, state.rssContent.topics, isEqual);
          if (isEmpty(newTopics)) return;
          state.rssContent.topics.unshift(...newTopics);
          console.log(state);
          renderNewTopics(newTopics, state);
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
