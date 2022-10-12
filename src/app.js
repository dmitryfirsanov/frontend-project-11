import btnAddRssURL from './handlers/btnAddRssURL.js';
import watcherValidationURL from './view/watchers';

const app = (state) => {
  const watcher = watcherValidationURL(state);
  btnAddRssURL(state, watcher);
};

export default app;
