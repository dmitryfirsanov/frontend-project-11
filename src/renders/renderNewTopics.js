import { uniqueId } from 'lodash';

export default (topics, state) => {
  const listOfPosts = document.querySelector('.posts .list-group');

  topics.forEach((topic) => {
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
    listOfPosts.prepend(post);
  });
};
