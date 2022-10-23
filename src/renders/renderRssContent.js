import { uniqueId } from 'lodash';

const buildBlockName = (textName) => {
  const blockName = document.createElement('div');
  blockName.classList.add('card-body');
  blockName.innerHTML = `<h2 class = "card-title h4">${textName}</h2>`;
  return blockName;
};

const buildBlockOfFeeds = (state) => {
  const block = document.createElement('div');
  block.classList.add('card', 'border-0');

  const blockName = buildBlockName(state.i18next.t('content.feeds'));

  const blockContent = document.createElement('ul');
  blockContent.classList.add('list-group', 'border-0', 'rounded-0');

  state.feeds.forEach(({ title, description }) => {
    const feed = document.createElement('li');
    feed.classList.add('list-group-item', 'border-0', 'border-end-0');

    feed.innerHTML = `
    <h3 class="h6 m-0">${title}</h3>
    <p class="m-0 small text-black-50">${description}</p>
    `;

    blockContent.prepend(feed);
  });

  block.append(blockName, blockContent);
  return block;
};

const buildBlockOfPosts = (state) => {
  const block = document.createElement('div');
  block.classList.add('card', 'border-0');

  const blockName = buildBlockName(state.i18next.t('content.topics'));

  const blockContent = document.createElement('ul');
  blockContent.classList.add('list-group', 'border-0', 'rounded-0');

  state.topics.forEach((topic) => {
    const id = uniqueId();
    const post = document.createElement('li');
    post.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');

    const link = document.createElement('a');
    link.classList.add('fw-bold');
    link.setAttribute('href', topic.link);
    link.setAttribute('data-id', `${id}`);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.textContent = `${topic.title}`;

    post.innerHTML = `<button type="button" class="btn btn-outline-primary btn-sm" data-id="${id}" data-bs-toggle="modal" data-bs-target="#modal">${state.i18next.t('content.view')}</button>`;

    post.prepend(link);
    blockContent.append(post);
  });

  block.append(blockName, blockContent);

  return block;
};

export default (state) => {
  const feeds = document.querySelector('.feeds');
  const posts = document.querySelector('.posts');
  feeds.innerHTML = '';
  posts.innerHTML = '';

  const blockOfFeeds = buildBlockOfFeeds(state);
  const blockOfPosts = buildBlockOfPosts(state);
  feeds.append(blockOfFeeds);
  posts.append(blockOfPosts);
};
