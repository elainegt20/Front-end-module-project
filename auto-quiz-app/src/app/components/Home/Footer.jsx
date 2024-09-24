import styles from './Home.module.css';

const Footer = () => {
  return (
    <footer className={styles.quizFooter}>
      <div className={styles.container}>
        © 2024 Quiz Generator. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
