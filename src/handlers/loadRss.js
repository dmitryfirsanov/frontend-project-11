/* eslint-disable no-param-reassign */
import axios from 'axios';
import parserRss from '../parsers/parserRss';
import { watcherLoadingRss, watcherActivityButton } from '../view/watchers.js';
import getIdForPosts from './getIdForPosts';
import { handlerOfLinkOpeningBtn, handlerOfOpenModalWindow } from './modalWindow.js';

import updateRss from './updateRss';

const loadRss = (url, state) => {
  const proxy = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);

  axios.get(proxy)
    .then((response) => parserRss(response))
    .catch((error) => {
      console.log(error.message);
      switch (error.message) {
        case 'Network Error':
          state.feedback = state.i18next.t('loading.errors.errorNetWork');
          break;
        case 'Parsing Error':
          state.feedback = state.i18next.t('loading.errors.errorResource');
          break;
        default:
          throw new Error();
      }
      watcherLoadingRss(state).isLoaded = false;
      watcherActivityButton(state).lock = false;
      throw new Error();
    })
    .then(({ feed, posts }) => {
      state.rssContent.resources.unshift(url);
      state.rssContent.feeds.unshift(feed);
      state.rssContent.posts.unshift(...posts);
      getIdForPosts(state.rssContent.posts);

      state.feedback = state.i18next.t('loading.isLoaded');
      watcherLoadingRss(state).isLoaded = true;
      watcherActivityButton(state).lock = false;
      handlerOfLinkOpeningBtn(state);
      handlerOfOpenModalWindow(state);
    })
    .then(() => {
      updateRss(state);
    });
};

export default loadRss;
