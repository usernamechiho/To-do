import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import LightSpeed from 'react-reveal/LightSpeed'
import { BsCalendarCheck } from 'react-icons/bs'

import styles from './SettingPage.module.scss'
import Button from './Components/Button'
import avatar from './Components/Avatars/avatar1.png'
import Header from '../../components/Header/Header'
import { useUserStore } from '../../store/UserContext'

function SettingPage() {
  const { user, dispatch } = useUserStore()

  const [userId, setUserId] = useState('')
  const [username, setUsername] = useState('')
  const [changeName, setChangeName] = useState(false)

  useEffect(() => {
    if (user) {
      setUserId(user.id)
      setUsername(user.name)
    }
  }, [user])

  const handleChange = () => {
    setChangeName((prev) => !prev)
  }

  const handleChangeUsername = (e) => {
    setUsername(e.currentTarget.value)
  }

  const handleSaveUsername = () => {
    dispatch({ type: 'CHANGE_USER', id: userId, name: username })
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch({ type: 'REMOVE_USER' })
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <LightSpeed right cascade>
          <div className={styles.settingHeader}>
            <header>
              <h1>Account</h1>
              <p>{username}</p>
            </header>
            <img src={avatar} alt='Profile' className={styles.profile} />
          </div>

          <div className={styles.settingInfo}>
            <header>
              <h1>Username</h1>
              {changeName ? (
                <input type='text' placeholder='name' value={username} onChange={handleChangeUsername} />
              ) : (
                <p>{username}</p>
              )}
              <h1 className={styles.usernameHeader}>User ID</h1>
              <p>{userId}</p>

              <Link to='/history'>
                <h2 className={styles.historyContainer}>
                  <BsCalendarCheck className={styles.calendarIcon} />
                  Check Consistency
                </h2>
              </Link>
            </header>
            <div>
              <Button handler={handleChange}>{changeName ? 'Save' : 'Change'}</Button>
            </div>
          </div>

          <div className={styles.settingSave}>
            <header>
              <p>
                For <span>safe use</span> of App, <br /> <br />
                Please log out.
              </p>
              <Link to='/'>
                <Button handler={handleSaveUsername}>Save and Exit</Button>
              </Link>
            </header>
            <div>
              <Link to='/login'>
                <Button handler={handleLogout}>Log out</Button>
              </Link>
            </div>
          </div>
        </LightSpeed>
      </div>
    </>
  )
}

export default SettingPage
