import axios from 'axios';
import { uniqueId } from 'lodash';
import parserRss from '../parsers/parserRss';

const loadRss = (url, state) => {
  const id = uniqueId();
  const proxy = new URL(`https://allorigins.hexlet.app/get?url=${url}`);
  proxy.searchParams.set('disableCache', true);

  axios.get(proxy.toString())
    .catch(() => {
      state.feedback = state.i18n.t('loading.errors.errorNetWork');
    })
    .then((response) => parserRss(response))
    .catch(({ message }) => {
      if (message === 'errorParsing') state.feedback = state.i18n.t('loading.errors.errorResource');
    })
    .then((parsedRss) => {
      
    });
};

// дописать событие loadRss, написать watcher для этого события, и для блоканья кнопки, подключить в событие btnAddRssURL ⌨️
// нужен ли новый рендер 🤔
export default loadRss;