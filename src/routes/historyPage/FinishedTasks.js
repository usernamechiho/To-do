import { useEffect, useState } from 'react'

import { BsTrash, BsCircle } from 'react-icons/bs'

import styles from './HistoryPage.module.scss'
import cx from 'classnames'
import PropTypes from 'prop-types'

const TASKS_KEY = 'task'

function FinishedTasks({ value }) {
  const [isEmpty, setIsEmpty] = useState(false)
  // localStorage.setItem(TASKS_KEY, JSON.stringify(FINISHED_TODO_LIST))
  const year = value.getFullYear()
  const month = value.getMonth() + 1
  const day = value.getDate()
  const date = `${year}-${month >= 10 ? month : `0${month}`}-${day >= 10 ? day : `0${day}`}`

  const [finishedTasks, setFinishedTasks] = useState([])

  const getTasks = () => {
    const localStorageTasks = localStorage.getItem(TASKS_KEY)
    if (localStorageTasks) {
      const localStorageTasksFinished = JSON.parse(localStorageTasks).filter((task) => task.completed_date === date)
      setFinishedTasks(localStorageTasksFinished)
    }
  }

  const deleteTask = (id) => {
    const localStorageTasks = localStorage.getItem(TASKS_KEY)
    const newTasks = JSON.parse(localStorageTasks).filter((task) => task.id !== id)
    localStorage.setItem(TASKS_KEY, JSON.stringify(newTasks))
    getTasks()
  }
  const handleDeleteBtnClick = (e) => {
    const { id } = e.currentTarget.dataset
    deleteTask(Number(id))
  }
  useEffect(() => {
    !finishedTasks.length ? setIsEmpty(true) : setIsEmpty(false)
  }, [finishedTasks])

  useEffect(() => {
    getTasks()
    // console.log(date, JSON.parse(localStorage.getItem(TASKS_KEY)).filter(task=>task.completed_date === date))
  }, [date])

  return (
    <ul className={styles.tasks}>
      {finishedTasks.map((task) => (
        <li key={`task-key-${task.id}`} className={styles.task}>
          <div className={styles.leftAlign}>
            <BsCircle className={cx(styles.categoryIcon, styles[task.category])} />
            <p className={styles.title}>{task.task}</p>
            <BsTrash className={styles.deleteIcon} data-id={task.id} onClick={handleDeleteBtnClick} />
          </div>
        </li>
      ))}
      {isEmpty ? <p className={styles.emptyMsg}>EMPTY</p> : null}
    </ul>
  )
}
FinishedTasks.propTypes = {
  value: PropTypes.objectOf(PropTypes.string),
}

export default FinishedTasks
