export default (state) => {
  if (state.valid) {
    const input = document.querySelector('#url-input');
    input.value = '';
    input.focus();
  }
};
