import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'tr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="logout-button language-button"
      title={i18n.language === 'en' ? 'Türkçe' : 'English'}
    >
      {i18n.language === 'en' ? 'TR' : 'EN'}
    </button>
  );
}; 