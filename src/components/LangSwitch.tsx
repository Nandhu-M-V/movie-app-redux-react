import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div>
      <select
        value={i18n.language}
        onChange={handleChange}
        className="rounded-md shadow-xs shadow-black
        bg-purple-700 text-gray-200 font-bold
        px-3 py-2 hover:bg-purple-800 text-sm
        focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="en">{t('english')}</option>
        <option value="hi">{t('hindi')}</option>
        <option value="ja">{t('japanese')}</option>
        <option value="de">{t('german')}</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
