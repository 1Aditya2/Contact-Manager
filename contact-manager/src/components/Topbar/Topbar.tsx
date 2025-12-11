import styles from "./Topbar.module.css";
import logo from "../../assets/ofbusiness.png";
export default function Topbar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.gradientBar}>
        <div className={styles.logoWrap}>
            <img src={logo} alt={'ofBusiness'} className={styles.logo} />
        </div>
      </div>
    </header>
  );
}
