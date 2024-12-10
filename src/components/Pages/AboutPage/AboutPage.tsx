import React from 'react';
import Text from '../../Text';
import classes from './AboutPage.module.scss';

const AboutPage: React.FC = () => {
  return (
    <div className="wrapper">
      <main className={classes.main}>
        <article className={classes.container}>
          <Text className={classes.title} view="title">
            About Us
          </Text>
          <Text className={classes.text} view="p-20">
            Welcome to Lalasia! We created this online store to make your shopping experience as convenient and
            enjoyable as possible. You'll find a wide range of stylish and fashionable clothing, shoes, and accessories,
            from everyday looks to evening wear. We constantly update our catalog with new collections and trendy items,
            so you can always find something special. We value your time and strive to provide fast shipping and
            impeccable service.
          </Text>
        </article>
        <article className={classes.container}>
          <Text className={classes.title} view="title">
            History
          </Text>
          <Text className={classes.text} view="p-20">
            Lalasia originated from a simple yet important idea: to make the search for stylish and high-quality
            clothing as convenient as possible. Tired of endlessly searching for suitable items in numerous stores,
            Alexandr and Dmitry, two close friends with excellent taste and a love for fashion, decided to create a
            single platform where one can find everything necessary to create a unique look. They combined their
            experience and knowledge in fashion and online trading to create the user-friendly and intuitive online
            market Lalasia, where every woman can quickly and easily find clothes, shoes, and accessories for any
            occasion. Our commitment to convenience, a stylish assortment, and impeccable service is the foundation of
            our work. We constantly update the catalog, collaborate with the best designers, and strive to provide our
            customers with an unforgettable shopping experience.
          </Text>
        </article>
      </main>
    </div>
  );
};

export default AboutPage;
