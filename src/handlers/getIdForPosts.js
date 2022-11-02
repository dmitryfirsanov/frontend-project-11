/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
import { uniqueId } from 'lodash';

export default (posts) => {
  posts.forEach((post) => {
    if (!post.hasOwnProperty('id')) {
      post.id = uniqueId();
    }
  });
};
