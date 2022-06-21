import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import styles from './Routes.module.scss'
import SideBar from '../components/SideBar/SideBar'
import Container from '../components/Container'
import MainPage from './mainPage'
import LoginPage from './loginPage'
import HistoryPage from './historyPage'
import SettingPage from './settingPage'
import SideBarContextProvider from '../store/SideBarContext'
import UserContextProvider from '../store/UserContext'

function App() {
  return (
    <Router>
      <UserContextProvider>
        <SideBarContextProvider>
          <div className={styles.app}>
            <div className={styles.outerContainer}>
              <SideBar />
              <Container>
                <Switch>
                  <Route exact path='/'>
                    {localStorage.getItem('user') == null || JSON.parse(localStorage.getItem('user')).id === '' ? (
                      <Redirect exact to='/login' />
                    ) : (
                      <Redirect exact to='/main' />
                    )}
                  </Route>
                  <Route exact path='/login' component={LoginPage} />
                  <Route exact path='/main' component={MainPage} />
                  <Route exact path='/history' component={HistoryPage} />
                  <Route exact path='/setting' component={SettingPage} />
                </Switch>
              </Container>
            </div>
          </div>
        </SideBarContextProvider>
      </UserContextProvider>
    </Router>
  )
}

export default App
