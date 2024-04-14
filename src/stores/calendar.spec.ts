import { describe, it, expect } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCalendarStore } from './calendar'

describe('Calendar ストア', () => {
  setActivePinia(createPinia())
  const existingMember = '山田花子'
  const newMember = '名無しの権兵衛'
  const newEventId = 1

  it('メンバー存在', () => {
    const calendar = useCalendarStore()

    expect(calendar.memberExists(existingMember)).toBeTruthy()
    expect(calendar.memberExists(newMember)).toBeFalsy()
  })

  it('メンバー追加', () => {
    const calendar = useCalendarStore()

    calendar.addMember(newMember)
    expect(calendar.memberExists(newMember)).toBeTruthy()
  })

  it('メンバー削除', () => {
    const calendar = useCalendarStore()

    calendar.deleteMember(newMember)
    expect(calendar.memberExists(newMember)).toBeFalsy()
  })

  it('イベント追加', () => {
    const calendar = useCalendarStore()
    const event = {
      title: 'タイトル',
      detail: '',
      start: '2024-06-01',
      end: '2024-06-02'
    }

    calendar.addMember(newMember)
    calendar.addEvent(newMember, event)
    expect(calendar.members[newMember][0]).toEqual({
      id: newEventId,
      memberName: newMember,
      ...event
    })
  })

  it('イベント削除', () => {
    const calendar = useCalendarStore()

    calendar.deleteEvent(newMember, newEventId)
    expect(calendar.members[newMember][0]).toBeFalsy()
  })
})
