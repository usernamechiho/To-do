import React, { useState } from 'react'
import CalendarForm from './CalendarForm'
import Header from '../../components/Header/Header'
import FinishedTasks from './FinishedTasks'
import styles from './HistoryPage.module.scss'

function HistoryPage() {
  const [value, setValue] = useState(new Date())

  return (
    <>
      <Header />
      <div className={styles.historyPage}>
        <div className={styles.leftAlign}>
          <h1>HISTORY</h1>
        </div>
        <div className={styles.leftAlign}>
          <h2>ANALYSIS</h2>
        </div>
        <CalendarForm setValue={setValue} value={value} />
        <div className={styles.leftAlign}>
          <h2>FINISHED TASKS</h2>
        </div>
        <FinishedTasks value={value} />
      </div>
    </>
  )
}

export default HistoryPage
