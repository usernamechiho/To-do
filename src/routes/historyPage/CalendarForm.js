import Calendar from 'react-calendar'
import moment from 'moment'
import './CalendarForm.scss' // css import
import PropTypes from 'prop-types'

function CalendarForm({ setValue, value }) {
  return (
    <div>
      <Calendar
        onChange={setValue}
        value={value}
        formatDay={(locale, date) => moment(date).format('DD')} // ''일 보이지않게 설정
        minDetail='month' // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail='month' // 상단 네비게이션에서 '월' 단위만 보이게 설정
        showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
      />
    </div>
  )
}
CalendarForm.propTypes = {
  value: PropTypes.objectOf(PropTypes.string),
  setValue: PropTypes.func,
}

export default CalendarForm
