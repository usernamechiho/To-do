import PropTypes from 'prop-types'

import styles from './RoundButton.module.scss'

function RoundButton({ children, onClick, className, ariaLabel }) {
  return (
    <button type='button' onClick={onClick} className={`${styles.roundButton} ${className}`} aria-label={ariaLabel}>
      {children}
    </button>
  )
}

RoundButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
}

export default RoundButton
