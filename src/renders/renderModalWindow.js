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

export default renderModalWindow;
