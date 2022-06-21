import { useEffect, useRef, useState } from 'react'

import PropTypes from 'prop-types'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import { CgEditBlackPoint } from 'react-icons/cg'

import styles from './MainPage.module.scss'
import { cx } from '../../styles/index'
import buttonStyles from './components/RoundButton.module.scss'
import RoundButton from './components/RoundButton'
import TodoList from './todoList/TodoList'
import TodoCategory from './todoCategory/TodoCategory'
import Header from '../../components/Header/Header'
import InputModal from './components/InputModal'
import { useUserStore } from '../../store/UserContext'

function MainPage() {
  const [currentCate, setCate] = useState('all')
  const [taskState, setTaskState] = useState([])
  const [modalVisible, setmodalVisible] = useState({ isEdit: false, isVisible: false })
  const [selectedTask, setselectedTask] = useState(null)

  const handleEditClick = () => {
    setmodalVisible({ isEdit: true, isVisible: false })
  }

  const { user } = useUserStore()

  return (
    <>
      <Header />
      <div className={styles.mainPage}>
        <header className={styles.greeting}>
          What&apos;s up,
          <span> {user.name}</span>
        </header>
        <TodoCategory setCate={setCate} currentCate={currentCate} tasks={taskState} />
        <div className={styles.mainPageTodoList}>
          <TodoList
            currentCate={currentCate}
            modalVisible={modalVisible}
            taskState={taskState}
            setTaskState={setTaskState}
            setselectedTask={setselectedTask}
            setmodalVisible={setmodalVisible}
          />
        </div>
        <FloatButton setmodalVisible={setmodalVisible} handleEditClick={handleEditClick} />

        {modalVisible.isVisible && (
          <InputModal
            modalVisible={modalVisible}
            handleModalVisible={setmodalVisible}
            selectedTask={selectedTask}
            taskState={taskState}
            setTaskState={setTaskState}
            setselectedTask={setselectedTask}
          />
        )}
      </div>
    </>
  )
}

function FloatButton({ setmodalVisible }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const buttonMenuRef = useRef(null)

  const handleOpenClick = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen)
  }

  const handleAddClick = () => {
    setMenuOpen(false)
    setmodalVisible({ isEdit: false, isVisible: true })
  }

  const handleEditClick = () => {
    setMenuOpen(false)
    setmodalVisible((prev) => ({ isEdit: !prev.isEdit, isVisible: false }))
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (buttonMenuRef.current && !buttonMenuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [buttonMenuRef])

  return (
    <nav ref={buttonMenuRef}>
      <span className={styles.circularMenu}>
        <RoundButton
          onClick={handleAddClick}
          className={cx({ [buttonStyles.addButtonOpen]: menuOpen }, { [buttonStyles.hideButton]: !menuOpen })}
          aria-label='Add button'
        >
          <AiOutlinePlus size='2em' />
        </RoundButton>
        <RoundButton
          onClick={handleEditClick}
          className={cx({ [buttonStyles.editButtonOpen]: menuOpen }, { [buttonStyles.hideButton]: !menuOpen })}
          aria-label='Edit button'
        >
          <MdModeEditOutline size='1.3em' />
        </RoundButton>
      </span>
      <RoundButton
        onClick={handleOpenClick}
        className={cx(buttonStyles.openMenuButton, { [buttonStyles.bump]: menuOpen })}
        aria-label='Open button'
      >
        <CgEditBlackPoint size='1.5em' />
      </RoundButton>
    </nav>
  )
}

FloatButton.propTypes = {
  setmodalVisible: PropTypes.func,
}

export default MainPage
