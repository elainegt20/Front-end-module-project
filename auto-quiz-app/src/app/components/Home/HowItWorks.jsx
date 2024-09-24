import { FileText, Wand2, ListChecks } from 'lucide-react';
import { Typography } from '@mui/material';
import styles from './Home.module.css';

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      subtitle: '1. Upload Your Notes',
      description: 'Upload your study materials in TXT format.',
    },
    {
      icon: Wand2,
      subtitle: '2. AI Processing',
      description:
        'Our AI analyzes your content and generates relevant quiz questions.',
    },
    {
      icon: ListChecks,
      subtitle: '3. Quiz Ready',
      description:
        'Access your personalized quiz and start boosting your knowledge retention.',
    },
  ];

  return (
    <div className={styles.howItWorks}>
      <Typography
        variant="h3"
        className={styles.howItWorksTitle}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '50px',
        }}
      >
        How It Works
      </Typography>
      <div className={styles.steps}>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={styles.iconWrapper}>
              <step.icon className={styles.HowItWorksIcon} />
            </div>
            <Typography variant="h5" className={styles.howItWorksSubTitle}>
              {step.subtitle}
            </Typography>
            <Typography
              variant="body1"
              className={styles.howItWorksDescription}
            >
              {step.description}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
