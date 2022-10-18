/* eslint-disable no-param-reassign */
import axios from 'axios';
import parserRss from '../parsers/parserRss';

const loadRss = (url, state, watcher) => {
  const proxy = new URL(`https://allorigins.hexlet.app/get?url=${url}`);
  proxy.searchParams.set('disableCache', true);

  axios.get(proxy.toString())
    .catch(() => {
      state.feedback = state.i18next.t('loading.errors.errorNetWork');
      watcher.isLoaded = false;
      throw new Error();
    })
    .then((response) => parserRss(response))
    .then((parsedRss) => {
      console.log(state);
      state.resources.push(url);
      state.feeds.push(parsedRss);
      state.feedback = state.i18next.t('loading.isLoaded');
      watcher.isLoaded = true;
    })
    .catch(({ message }) => {
      if (message === 'parsing error') state.feedback = state.i18next.t('loading.errors.errorResource');
      watcher.isLoaded = false;
      throw new Error();
    });
};

export default loadRss;
