import PropTypes from 'prop-types'

import styles from './Button.module.scss'

function Button({ children, handler }) {
  return (
    <button type='button' onClick={handler} className={styles.button}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  handler: PropTypes.func,
}

export default Button
