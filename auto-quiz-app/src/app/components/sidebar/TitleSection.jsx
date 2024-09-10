import Typography from '@mui/material/Typography';

import styles from './SideBar.module.css';

const TitleSection = () => {
    return(
        <div className={styles.title}>
            <Typography variant="overline" sx={{lineHeight:'0'}}>Dashboard Name</Typography>
            <Typography variant="h6">Main Title</Typography>
        </div>
    )
}

export default TitleSection;