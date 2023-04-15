import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material";
import SvgIcon from "../svgs/SvgIcon";
import { NavElementProps } from "./types";
import styles from "../../styles/Nav.module.css";


export function NavElement({path, setActivePage, name, Icon, user}: NavElementProps) {
  const theme = useTheme();
  const router = useRouter();
  console.log(user?.jwt);

  return (
    <div className={router.pathname == path ? styles.navItemActive : styles.navItem} onClick={() => setActivePage(path)}>
      <div className={styles.navItemContainer}>
          <Link href={path} passHref>
            <div className={styles.navLink}>
            {user?.jwt == undefined ? null : (<div className={styles.optionIcon}>
              <SvgIcon
                Icon={Icon!}
                width={22}
                height={22}
                fillColor={theme.palette.background.default}
              />
            </div>)}
            <div className={styles.optionLabel}>{name}</div>
            </div>
        </Link>
      </div>
    </div>
  )
}