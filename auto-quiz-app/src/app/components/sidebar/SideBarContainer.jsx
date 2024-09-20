import styles from './SideBar.module.css';

const SideBarContainer = ({children}) => {
    return (
       <div className={styles.sideBarContainer}>
          {children}
       </div>
    );

}

export default SideBarContainer;