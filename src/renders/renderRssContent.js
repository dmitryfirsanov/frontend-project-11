import { uniqueId } from 'lodash';

export const renderPosts = (topics, state) => {
  const cardName = document.querySelector('.posts .card-body h2');
  cardName.textContent = state.i18next.t('content.posts');

  const listOfPosts = document.querySelector('.posts .list-group');
  listOfPosts.innerHTML = '';

  topics.forEach((topic) => {
    const id = uniqueId();
    const post = document.createElement('li');

    post.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    post.innerHTML = `
    <a class="fw-bold" href=${topic.link} data-id=${id} target="_blank" rel="noopener noreferrer">${topic.title}</a>
    <button type="button" class="btn btn-outline-primary btn-sm" data-id="${id}" data-bs-toggle="modal" data-bs-target="#modal">${state.i18next.t('content.view')}</button>
    `;

    listOfPosts.append(post);
  });
};

export const renderFeeds = (state) => {
  const cardName = document.querySelector('.feeds .card-body h2');
  cardName.textContent = state.i18next.t('content.feeds');

  const listOfFeeds = document.querySelector('.feeds .list-group');
  listOfFeeds.innerHTML = '';

  state.rssContent.feeds.forEach(({ title, description }) => {
    const feed = document.createElement('li');
    feed.classList.add('list-group-item', 'border-0', 'border-end-0');

    feed.innerHTML = `
    <h3 class="h6 m-0">${title}</h3>
    <p class="m-0 small text-black-50">${description}</p>
    `;

    listOfFeeds.append(feed);
  });
};
