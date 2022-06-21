import { CgMenu } from 'react-icons/cg'

import styles from './Header.module.scss'
import { useSideBarStore } from '../../store/SideBarContext'

function Header() {
  const { setIsSideOpen } = useSideBarStore()

  const toggleSideBar = () => {
    setIsSideOpen(true)
  }
  return (
    <div className={styles.container}>
      <CgMenu onClick={toggleSideBar} />
    </div>
  )
}

export default Header
