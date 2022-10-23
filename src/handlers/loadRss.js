/* eslint-disable no-param-reassign */
import axios from 'axios';
import parserRss from '../parsers/parserRss';
import updateRss from './updateRss.js';

const loadRss = (watcherRss, watcherUpdateRss, url, state) => {
  const proxy = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);

  axios.get(proxy)
    .catch(() => {
      state.feedback = state.i18next.t('loading.errors.errorNetWork');
      watcherRss.isLoaded = false;
      throw new Error();
    })
    .then((response) => parserRss(response))
    .catch(() => {
      state.feedback = state.i18next.t('loading.errors.errorResource');
      watcherRss.isLoaded = false;
      throw new Error();
    })
    .then(({ feed, topics }) => {
      state.resources.push(url);
      state.feeds.push(feed);
      state.topics.push(...topics);
      state.feedback = state.i18next.t('loading.isLoaded');
      watcherRss.isLoaded = true;
      console.log(state);
    })
    .then(() => {
      updateRss(watcherUpdateRss, state);
    });
};

export default loadRss;
