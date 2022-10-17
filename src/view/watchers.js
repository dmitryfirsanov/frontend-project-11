import onChange from 'on-change';
import renderFeedback from '../renders/renderFeedback.js';

export default (state) => {
  const wathcer = onChange(state, (path, isValid) => {
    renderFeedback(isValid, state.feedback);
  });

  return wathcer;
};
