/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
import { uniqueId } from 'lodash';

export default (topics) => {
  topics.forEach((topic) => {
    if (!topic.hasOwnProperty('id')) {
      topic.id = uniqueId();
    }
  });
};
