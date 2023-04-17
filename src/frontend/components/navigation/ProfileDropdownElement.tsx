import Image from "next/image";
import styles from "../../styles/Nav.module.css";
import profile from "../../assets/profile_small.jpg";
import down from "../../assets/caret-down-fill.svg"

interface ProfileDropDownElementProps {
  user: {
    username: string;
    id: string;
    jwt: string;
    email: string;
  }
  logout: () => void;
}

export const ProfileDropDownElement = ({ user, logout }: ProfileDropDownElementProps) => {
  return user?.jwt === undefined ? null : (
    <div className={`${styles.navItem} ${styles.profileOption}`}>
      <div className={`${styles.navLink} ${styles.profileImgContainer}`}>
        <div onClick={logout}>
          <Image alt="profile" width="24" height="24" style={{ borderRadius: 41 }} src={profile} /></div>
        <div className={styles.profileLabel}>
          <div className={styles.navLabel}>Me</div>
          <Image width="16" height="16" style={{ opacity: 0.6 }} src={down} alt="dropdown" />               
        </div>
      </div>
    </div>
  )
}