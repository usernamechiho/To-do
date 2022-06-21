import { useState } from 'react'

import { useHistory } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

import styles from './LoginPage.module.scss'
import { useUserStore } from '../../store/UserContext'

function LoginPage() {
  const [Id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordView, setIsPasswordView] = useState(false)

  const { dispatch } = useUserStore()

  const passwordViewIcon = isPasswordView ? (
    <FaRegEye className={styles.passwordIcon} />
  ) : (
    <FaRegEyeSlash className={styles.passwordIcon} />
  )

  const history = useHistory()

  const handleChangeId = (e) => setId(e.currentTarget.value)

  const handleChangePassword = (e) => setPassword(e.currentTarget.value)

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch({ type: 'CHANGE_USER', id: Id, name: Id })

    history.push('/')
  }

  const handlePasswordIcon = () => {
    setIsPasswordView((prev) => !prev)
  }

  return (
    <div className={styles.loginContainer}>
      <header>TODO LIST</header>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <input placeholder='ID를 입력하세요' value={Id} onChange={handleChangeId} />
        </div>
        <div className={styles.inputBox}>
          <input
            placeholder='비밀번호를 입력하세요'
            type={!isPasswordView && 'password'}
            value={password}
            onChange={handleChangePassword}
          />
          <button type='button' className={styles.passwordIcon} onClick={handlePasswordIcon}>
            {passwordViewIcon}
          </button>
        </div>
        <button type='submit' className={styles.loginBtn}>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
