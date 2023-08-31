import React, { useState } from "react"
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { isSameDay, isWithinInterval, format } from "date-fns"
import ru from "date-fns/locale/ru"

import styles from "../styles/my_schedule.module.scss"

registerLocale("ru", ru)

interface Event {
  title: string
  startDate: Date
  endDate: Date
}

export default function MySchedule() {
  const [events, setEvents] = useState<Event[]>([])
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
  })

  const handleStartDateChange = (date: Date) => {
    if (date > newEvent.endDate) {
      setNewEvent((prev) => ({
        ...prev,
        startDate: date,
        endDate: date,
      }))
    } else {
      setNewEvent((prev) => ({ ...prev, startDate: date }))
    }
  }

  const handleEndDateChange = (date: Date) => {
    setNewEvent((prevEvent) => ({ ...prevEvent, endDate: date }))
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEvent((prevEvent) => ({ ...prevEvent, title: e.target.value }))
  }

  const handleAddEvent = () => {
    if (!newEvent.title) {
      alert("Введите название записи.")
      return
    }

    const isOverlap = events.some((event) => {
      const startsBeforeEnd = isWithinInterval(newEvent.startDate, {
        start: event.startDate,
        end: event.endDate,
      })

      const endsAfterStart = isWithinInterval(newEvent.endDate, {
        start: event.startDate,
        end: event.endDate,
      })

      return (
        startsBeforeEnd ||
        endsAfterStart ||
        isSameDay(newEvent.startDate, event.startDate)
      )
    })

    if (!isOverlap) {
      setEvents([...events, newEvent])
      setNewEvent({
        title: "",
        startDate: new Date(),
        endDate: new Date(),
      })
    } else {
      alert("Даты пересекаются с существующими событиями.")
    }
  }

  const handleDeleteEvent = (index: number) => {
    const updatedEvents = events.filter((_, i) => i !== index)
    setEvents(updatedEvents)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Управление записями</h2>
      <div className={styles.eventForm}>
        <input
          type="text"
          placeholder="Название записи"
          value={newEvent.title}
          onChange={handleTitleChange}
        />
        <DatePicker
          selected={newEvent.startDate}
          onChange={handleStartDateChange}
          locale="ru"
          dateFormat="dd.MM.yyyy"
          selectsStart
          startDate={newEvent.startDate}
          endDate={newEvent.endDate}
          minDate={newEvent.startDate}
        />
        <DatePicker
          selected={newEvent.endDate}
          onChange={handleEndDateChange}
          locale="ru"
          dateFormat="dd.MM.yyyy"
          selectsEnd
          startDate={newEvent.startDate}
          endDate={newEvent.endDate}
          minDate={newEvent.startDate}
        />
        <button onClick={handleAddEvent}>Добавить</button>
      </div>
      <div className={styles.eventList}>
        <h3 className={styles.eventHeader}>События:</h3>
        {events.length === 0 ? (
          <p className={styles.noEvents}>Записей нет</p>
        ) : (
          <ul className={styles.list}>
            {events.map((event, index) => (
              <li key={index} className={styles.eventItem}>
                <span>{event.title}</span>

                <span>
                  {format(event.startDate, "dd.MM.yyyy")} -{" "}
                  {format(event.endDate, "dd.MM.yyyy")}
                </span>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteEvent(index)}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
