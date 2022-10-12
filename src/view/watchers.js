import onChange from 'on-change';
import renderFeedbackMessage from '../renders/renderFeedbackMessage.js';

export default (state) => {
  const wathcer = onChange(state, (path, isValid) => {
    renderFeedbackMessage(isValid, state.feedback);
  });

  return wathcer;
};
