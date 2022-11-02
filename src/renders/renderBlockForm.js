const input = document.querySelector('#url-input');
const button = document.querySelector('form button');

export const lockForm = () => {
  input.setAttribute('readonly', true);
  button.setAttribute('disabled', true);
};

export const unlockForm = () => {
  input.removeAttribute('readonly');
  button.removeAttribute('disabled');
};
