/* eslint-disable no-param-reassign */
import axios from 'axios';
import parserRss from '../parsers/parserRss';
import { watcherLoadingRss } from '../view/watchers.js';
import updateRss from './updateRss';

const loadRss = (url, state) => {
  const proxy = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);

  axios.get(proxy)
    .catch(() => {
      state.feedback = state.i18next.t('loading.errors.errorNetWork');
      watcherLoadingRss(state).isLoaded = false;
      throw new Error();
    })
    .then((response) => parserRss(response))
    .catch(() => {
      state.feedback = state.i18next.t('loading.errors.errorResource');
      watcherLoadingRss(state).isLoaded = false;
      throw new Error();
    })
    .then(({ feed, topics }) => {
      state.rssContent.resources.push(url);
      state.rssContent.feeds.push(feed);
      state.rssContent.topics.unshift(...topics);
      state.feedback = state.i18next.t('loading.isLoaded');
      watcherLoadingRss(state).isLoaded = true;
    })
    .then(() => {
      updateRss(state);
    });
};

export default loadRss;
