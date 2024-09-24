import { BookOpen, BrainCircuit, Lightbulb } from 'lucide-react';
import { Typography } from '@mui/material';
import styles from './Home.module.css';

const FeatureCards = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Learn Smarter',
      description:
        'Turn your notes into engaging quizzes for more effective studying.',
    },
    {
      icon: BrainCircuit,
      title: 'Boost Retention',
      description:
        'Improve your memory and understanding through active recall with our quizzes.',
    },
    {
      icon: Lightbulb,
      title: 'Instant Feedback',
      description: 'Get immediate results to reinforce your learning process.',
    },
  ];

  return (
    <div className={styles.featureCards}>
      {features.map((feature, index) => (
        <div key={index} className={styles.card}>
          <feature.icon className={styles.icon} />
          <Typography varian="h3" className={styles.featureTitle}>
            {feature.title}
          </Typography>
          <Typography variant="body1" className={styles.featureDescription}>
            {feature.description}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default FeatureCards;
