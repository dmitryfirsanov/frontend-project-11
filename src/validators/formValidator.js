import * as yup from 'yup';

const validateForm = (i18next, content, listOfFeeds) => {
  yup.setLocale({
    mixed: {
      notOneOf: i18next.t('validation.errors.errorUniqRSSUrl'),
    },
    string: {
      url: i18next.t('validation.errors.errorURL'),
      min: i18next.t('validation.errors.errorRequared'),
    },
  });

  const schema = yup.string().url().min(1).notOneOf(listOfFeeds);

  return schema.validate(content);
};

export default validateForm;
