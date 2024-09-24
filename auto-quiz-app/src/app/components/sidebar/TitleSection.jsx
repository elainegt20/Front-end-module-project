import Typography from '@mui/material/Typography';

import styles from './SideBar.module.css';

const TitleSection = ({ data }) => {
  return (
    <div className={styles.title}>
      <Typography variant="overline" sx={{ lineHeight: '0' }}>
        Quiz Generator App
      </Typography>
      <Typography variant="h6">{data.quizName}</Typography>
    </div>
  );
};

export default TitleSection;
