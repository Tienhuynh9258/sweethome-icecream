import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-vanilla">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-chocolate mb-6">{t('about.title')}</h2>
          <p className="text-chocolate/80 mb-4">
            {t('about.description1')}
          </p>
          <p className="text-chocolate/80">
            {t('about.description2')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
