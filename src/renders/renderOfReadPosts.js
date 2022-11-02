export default (posts) => {
  posts.forEach((id) => {
    const post = document.querySelector(`a[data-id="${id}"]`);
    if (post.classList.contains('fw-bold')) post.classList.remove('fw-bold');
    post.classList.add('fw-normal', 'link-secondary');
  });
};
