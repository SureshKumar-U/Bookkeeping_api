const i18n = require('i18next');   
const i18nextMiddleware = require('i18next-http-middleware'); 
const Backend = require('i18next-fs-backend');
const path = require('path');

i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    debug:true,
    fallbackLng: 'en', // Default language
    preload: ['en','de'], // Languages to preload
    backend: {
      loadPath: path.join(process.cwd(),"locales", "{{lng}}", "translation.json"),
    },
  });

module.exports = i18n;
