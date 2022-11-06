import renderOfReadPosts from './renderOfReadPosts.js';

export const renderPosts = (state, i18n) => {
  const cardName = document.querySelector('.posts .card-body h2');
  cardName.textContent = i18n.t('content.posts');

  const listOfPosts = document.querySelector('.posts .list-group');
  listOfPosts.innerHTML = '';

  state.rssContent.topics.forEach((topic) => {
    const post = document.createElement('li');

    post.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    post.innerHTML = `
    <a class="fw-bold" href=${topic.link} data-id=${topic.id} target="_blank" rel="noopener noreferrer">${topic.title}</a>
    <button type="button" class="btn btn-outline-primary btn-sm" data-id="${topic.id}" data-bs-toggle="modal" data-bs-target="#modal">${i18n.t('content.view')}</button>
    `;

    listOfPosts.append(post);
  });
  renderOfReadPosts(state.uiState.isRead);
};

export const renderFeeds = (state, i18n) => {
  const cardName = document.querySelector('.feeds .card-body h2');
  cardName.textContent = i18n.t('content.feeds');

  const listOfFeeds = document.querySelector('.feeds .list-group');
  listOfFeeds.innerHTML = '';

  state.rssContent.feeds.forEach(({ title, description }) => {
    const feed = document.createElement('li');
    feed.classList.add('list-group-item', 'border-0', 'border-end-0');

    const header = document.createElement('h3');
    header.classList.add('h6', 'm-0');
    header.textContent = title;

    const definition = document.createElement('p');
    definition.classList.add('m-0', 'small', 'text-black-50');
    definition.textContent = description;

    feed.append(header, definition);
    listOfFeeds.append(feed);
  });
};
