/* eslint-disable no-param-reassign */
import axios from 'axios';
import { differenceWith, isEqual, isEmpty } from 'lodash';
import parserRSS from '../parsers/parserRss.js';
import getIdForPosts from './getIdForPosts.js';
import { renderPosts } from '../renders/renderRssContent.js';
import { handlerOfLinkOpeningBtn, handlerOfOpenModalWindow } from './modalWindow.js';

const updateRss = (state) => {
  setTimeout(() => {
    const proxy = 'https://allorigins.hexlet.app/get?disableCache=true&url=';

    // eslint-disable-next-line arrow-body-style
    const promises = state.rssContent.resources.map((resource) => {
      return axios.get(`${proxy}${resource}`)
        .then((response) => parserRSS(response))
        .catch((error) => {
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
          throw new Error();
        });
    });

    Promise.all(promises)
      .then((parsedRss) => {
        parsedRss.forEach(({ posts }) => {
          const oldPostsLinks = state.rssContent.posts.map((post) => post.link);
          const allPostsLinks = posts.map((post) => post.link);
          const newPostsLinks = differenceWith(allPostsLinks, oldPostsLinks, isEqual);
          if (isEmpty(newPostsLinks)) return;

          const newPosts = newPostsLinks
            .map((link) => posts.find((post) => post.link === link));

          state.rssContent.posts.unshift(...newPosts);
          getIdForPosts(state.rssContent.posts);
          renderPosts(state.rssContent.posts, state);
          handlerOfLinkOpeningBtn(state);
          handlerOfOpenModalWindow(state);
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
