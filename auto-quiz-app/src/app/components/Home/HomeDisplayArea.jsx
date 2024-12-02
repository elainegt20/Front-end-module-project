import { Typography } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import FeatureCards from './FeatureCards';
import HowItWorks from './HowItWorks';
import FileUploader from '../FileUploader/FileUploader';
import styles from './Home.module.css';

const HomeDisplayArea = () => {
  return (
    <div className={styles.layout}>
      <main className={styles.mainContent}>
        <Typography variant="h2" className={styles.title}>
          Transform Your Notes into Quizzes
        </Typography>
        <FeatureCards />
        <div className={styles.uploadSection}>
          <FileUploader />
        </div>
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default HomeDisplayArea;
