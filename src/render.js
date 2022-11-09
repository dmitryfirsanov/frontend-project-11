const feedback = document.querySelector('.feedback');
const input = document.querySelector('#url-input');
const button = document.querySelector('form button');

const renderFeedback = (status, message, i18n) => {
  feedback.textContent = i18n.t(message);

  if (feedback.classList.contains('text-danger')) feedback.classList.remove('text-danger');
  else feedback.classList.remove('text-succsess');

  if (status) {
    if (input.classList.contains('is-invalid')) input.classList.remove('is-invalid');
    feedback.classList.add('text-success');
    input.value = '';
  } else {
    input.classList.add('is-invalid');
    feedback.classList.add('text-danger');
  }

  input.focus();
};

const renderFeeds = (state, i18n) => {
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

const renderOfReadPosts = (posts) => {
  posts.forEach((id) => {
    const post = document.querySelector(`a[data-id="${id}"]`);
    if (post.classList.contains('fw-bold')) post.classList.remove('fw-bold');
    post.classList.add('fw-normal', 'link-secondary');
  });
};

const renderPosts = (state, i18n) => {
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

const renderModalWindow = (viewedPost) => {
  const {
    description, title, link,
  } = viewedPost;

  const modalTitle = document.querySelector('.modal-title');
  modalTitle.textContent = title;

  const modalBody = document.querySelector('.modal-body');
  modalBody.textContent = description;

  const btnCheck = document.querySelector('.modal-footer a');
  btnCheck.setAttribute('href', link);
};

const renderLockForm = () => {
  input.setAttribute('readonly', true);
  button.setAttribute('disabled', true);
};

const renderUnlockForm = () => {
  input.removeAttribute('readonly');
  button.removeAttribute('disabled');
};

export {
  renderFeedback, renderFeeds, renderOfReadPosts,
  renderPosts, renderModalWindow, renderLockForm, renderUnlockForm,
};
