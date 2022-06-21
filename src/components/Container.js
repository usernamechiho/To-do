import PropTypes from 'prop-types'

import styles from './Components.module.scss'
import { cx } from '../styles'
import { useSideBarStore } from '../store/SideBarContext'

function Container({ children }) {
  const { isSideOpen } = useSideBarStore()
  return <div className={cx(styles.container, { [styles.showSideBar]: isSideOpen })}>{children}</div>
}

Container.propTypes = {
  children: PropTypes.node,
}

export default Container
