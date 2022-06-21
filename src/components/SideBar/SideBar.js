import { useHistory, Link } from 'react-router-dom'
import { IoIosArrowBack as CloseButton } from 'react-icons/io'
import { BsClockHistory as HistoryIcon } from 'react-icons/bs'
import { FiSettings as SettingsIcon } from 'react-icons/fi'
import { RiLogoutBoxLine as LogoutIcon } from 'react-icons/ri'
import { CgMenuGridO as OverviewIcon } from 'react-icons/cg'

import styles from './SideBar.module.scss'
import { cx } from '../../styles'
import Profile from './Profile'
import { useSideBarStore } from '../../store/SideBarContext'
import { useUserStore } from '../../store/UserContext'

function SideBar() {
  const { isSideOpen, setIsSideOpen } = useSideBarStore()
  const { user, dispatch } = useUserStore()
  const history = useHistory()

  const toggleSideBar = () => {
    setIsSideOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch({ type: 'REMOVE_USER' })

    history.replace('/login')
    setIsSideOpen(false)
  }

  return (
    <div className={cx(styles.container, { [styles.showSideBar]: !isSideOpen })}>
      <section className={styles.topSection}>
        <Profile />
        <button type='button' className={styles.closeButton} onClick={toggleSideBar}>
          <CloseButton className={styles.closeButtonIcon} />
        </button>
      </section>
      <h2 className={styles.userName}>{user.name}</h2>
      <ul className={styles.menuItems}>
        <li className={styles.menuItem}>
          <OverviewIcon className={styles.menuIcon} />
          <Link to='/'>
            <button type='button' className={styles.menuItemTitle} onClick={toggleSideBar}>
              Overview
            </button>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <HistoryIcon className={styles.menuIcon} />
          <Link to='/history'>
            <button type='button' className={styles.menuItemTitle} onClick={toggleSideBar}>
              History
            </button>
          </Link>
        </li>
        <li className={styles.menuItem}>
          <SettingsIcon className={styles.menuIcon} />
          <Link to='/setting'>
            <button type='button' className={styles.menuItemTitle} onClick={toggleSideBar}>
              Settings
            </button>
          </Link>
        </li>
        <li className={styles.menuItem} onClick={handleLogout} role='presentation'>
          <LogoutIcon className={styles.menuIcon} />
          <button type='button' className={styles.menuItemTitle}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default SideBar
