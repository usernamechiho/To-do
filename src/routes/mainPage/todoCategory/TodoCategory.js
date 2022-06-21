import { useState, useRef, useEffect } from 'react'

import PropTypes from 'prop-types'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import styles from './TodoCategory.module.scss'
import { cx } from '../../../styles'
import { useSideBarStore } from '../../../store/SideBarContext'

const CATE_LIST = [
  {
    id: 1,
    category: 'all',
    text: '전체보기',
  },
  {
    id: 2,
    category: 'business',
    text: '일',
  },
  {
    id: 3,
    category: 'health',
    text: '운동',
  },
  {
    id: 4,
    category: 'personal',
    text: '개인',
  },
  {
    id: 5,
    category: 'hobby',
    text: '취미',
  },
]

const TOTAL_SLIDES = 3

function TodoCategory({ currentCate, setCate, tasks }) {
  const [currentIndex, setIndex] = useState(0)
  const [allTask, setTask] = useState(0)
  const [businessTask, setBusiness] = useState(0)
  const [healthTask, setHealth] = useState(0)
  const [personalTask, setPersonal] = useState(0)
  const [hobbyTask, setHobby] = useState(0)
  const [allCompleted, setAllCompleted] = useState(0)
  const [bsCompleted, setBsCompleted] = useState(0)
  const [heCompleted, setHeCompleted] = useState(0)
  const [perCompleted, setPerCompleted] = useState(0)
  const [hobCompleted, setHobCompleted] = useState(0)

  const catesRef = useRef()

  const task = localStorage.getItem('task') === null ? [] : JSON.parse(localStorage.getItem('task'))

  const taskState = [allTask, businessTask, healthTask, personalTask, hobbyTask]
  const taskProgress = [allCompleted, bsCompleted, heCompleted, perCompleted, hobCompleted]

  const { setAllPercentage } = useSideBarStore()
  const allPercentage = Math.ceil(allCompleted)

  useEffect(() => {
    setAllPercentage(allPercentage)
  }, [allPercentage])

  useEffect(() => {
    setTask(Object.keys(task).length)
    setAllCompleted(() => (allTask === 0 ? 0 : (task.filter((item) => item.completed).length / allTask) * 100))
    setBusiness(task.filter((item) => item.category === 'business').length)
    setBsCompleted(() =>
      businessTask === 0
        ? 0
        : (task.filter((item) => item.category === 'business' && item.completed).length / businessTask) * 100
    )
    setHealth(task.filter((item) => item.category === 'health').length)
    setHeCompleted(() =>
      healthTask === 0
        ? 0
        : (task.filter((item) => item.category === 'health' && item.completed).length / healthTask) * 100
    )
    setPersonal(task.filter((item) => item.category === 'personal').length)
    setPerCompleted(() =>
      personalTask === 0
        ? 0
        : (task.filter((item) => item.category === 'personal' && item.completed).length / personalTask) * 100
    )
    setHobby(task.filter((item) => item.category === 'hobby').length)
    setHobCompleted(() =>
      hobbyTask === 0
        ? 0
        : (task.filter((item) => item.category === 'hobby' && item.completed).length / hobbyTask) * 100
    )
  }, [tasks, allTask, businessTask, heCompleted, healthTask, hobbyTask, personalTask, task])

  const handleClickCate = (e) => {
    const { dataset } = e.currentTarget
    const { category } = dataset

    setCate(() => {
      const newCate = category
      return newCate
    })
  }

  const handlePrev = () => {
    if (currentIndex) {
      setIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < TOTAL_SLIDES) {
      setIndex(currentIndex + 1)
    }
  }

  useEffect(() => {
    catesRef.current.style.transform = `translateX(-${currentIndex * 13}0px)`
  }, [currentIndex])

  return (
    <section className={styles.todoCategory}>
      <h3>Categories</h3>
      <div className={styles.cateWrap}>
        <button type='button' className={styles.arrowBtn} onClick={handlePrev}>
          <FaArrowLeft />
        </button>
        <button type='button' className={styles.arrowBtn} onClick={handleNext}>
          <FaArrowRight />
        </button>
        <ul className={styles.categoryList} ref={catesRef}>
          {CATE_LIST.map((cate, idx) => (
            <li
              key={`category-${cate.id}`}
              className={cx(styles.category, { [styles.isActive]: cate.category === currentCate })}
            >
              <button className={styles.cateBtn} type='button' data-category={cate.category} onClick={handleClickCate}>
                <span className={styles.cateTasks}>{cate.category === 'all' ? allTask : taskState[idx]} tasks</span>
                <span className={styles.cateTitle}>{cate.text}</span>
                <div className={cx(styles.taskProgressWrap, styles[cate.category])}>
                  <div className={styles.taskProgress} style={{ width: `${Math.ceil(taskProgress[idx])}%` }} />
                </div>
                <span className={styles.percent}>{Math.ceil(taskProgress[idx])}%</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const taskType = {
  id: PropTypes.number,
  task: PropTypes.string,
  category: PropTypes.string,
  completed: PropTypes.bool,
  expiry_date: PropTypes.string,
  completed_date: PropTypes.string,
}

TodoCategory.propTypes = {
  currentCate: PropTypes.string,
  setCate: PropTypes.func,
  tasks: PropTypes.arrayOf(PropTypes.shape(taskType)),
}

export default TodoCategory
