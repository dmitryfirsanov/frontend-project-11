import btnAddRssURL from './handlers/btnAddRssURL.js';
import { watcherRss, watcherUpdateRss } from './view/watchers';

const app = (state) => {
  btnAddRssURL(watcherRss(state), watcherUpdateRss(state), state);
};

export default app;
