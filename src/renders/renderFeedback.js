export default (status, message) => {
  const input = document.querySelector('#url-input');
  const feedback = document.querySelector('.feedback');

  feedback.textContent = message;

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
