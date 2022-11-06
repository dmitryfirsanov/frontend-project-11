import * as yup from 'yup';

const validateForm = (content, listOfFeeds) => {
  yup.setLocale({
    mixed: {
      notOneOf: 'validation.errors.errorUniqRSSUrl',
    },
    string: {
      url: 'validation.errors.errorURL',
      min: 'validation.errors.errorRequared',
    },
  });

  const schema = yup.string().url().min(1).notOneOf(listOfFeeds);

  return schema.validate(content);
};

export default validateForm;
