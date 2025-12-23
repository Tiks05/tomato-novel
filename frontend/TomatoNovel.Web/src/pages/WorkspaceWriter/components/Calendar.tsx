import { useState } from 'react'
import { Calendar as AntCalendar, DatePicker } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

import { useGoTo } from '@/hooks/use-go-to'
import {} from '@/api/writer.api'

import styles from './Calendar.module.scss'

const { MonthPicker } = DatePicker

const Calendar = () => {
  const { goTo } = useGoTo()

  const [calendarValue, setCalendarValue] = useState<Dayjs>(dayjs())
  const [monthValue, setMonthValue] = useState<Dayjs>(dayjs())

  return (
    <div className={styles.homeBookContainer}>
      <div className={`${styles.serialCard} ${styles.homeBookExpand}`}>
        {/* ===== header ===== */}
        <div className={styles.homeBookHeader}>
          <span className={`${styles.headerTab} ${styles.active}`}>打卡日历</span>
          <span className={styles.headerTab}>签到日历</span>

          <div className={styles.headerLabel}>
            <span className={styles.writeButton}>
              <div className={styles.hoverup}>规则</div>
            </span>
          </div>
        </div>

        {/* ===== month choose ===== */}
        <div className={styles.choseTime}>
          <MonthPicker
            value={monthValue}
            format="YYYY年MM月"
            allowClear={false}
            inputReadOnly
            onChange={val => {
              if (!val) return
              setMonthValue(val)
              setCalendarValue(val)
            }}
          />

          <div className={styles.downBtn}>
            <span>Tikers的新书</span>
            <img src="/src/assets/images/workspace/writer/x.png" alt="" />

            <div className={styles.downLink}>
              <em onClick={() => goTo('/book/xxx')}>Tikers的新书</em>
            </div>
          </div>
        </div>

        {/* ===== calendar ===== */}
        <div className={styles.calendarCon}>
          <AntCalendar
            value={calendarValue}
            fullscreen={false}
            headerRender={() => null}
            dateFullCellRender={date => {
              const isCurrentMonth = date.month() === calendarValue.month()

              const isSelected = date.isSame(calendarValue, 'day')

              return (
                <div
                  className={[
                    styles.dateCell,
                    isSelected ? styles.selected : '',
                    !isCurrentMonth ? styles.disabled : '',
                  ].join(' ')}
                >
                  {date.date()}
                </div>
              )
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Calendar
