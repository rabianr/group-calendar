import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { format, addDays } from 'date-fns'
import type { GCEvent } from '@/components/CalendarEvent.types'

export const useCalendarStore = defineStore('calendar', () => {
  const members = reactive<{ [key: string]: GCEvent[] }>(initialState)

  /**
   * メンバーの存在をチェック
   */
  function memberExists(name: string) {
    return !!members[name]
  }

  /**
   * 新しいメンバーを追加
   */
  function addMember(name: string) {
    if (!memberExists(name)) {
      members[name] = []
    }
  }

  /**
   * メンバーを削除
   *
   * @return 成功の場合 true を返却、メンバーが存在しない場合 false を返却
   */
  function deleteMember(name: string) {
    if (!memberExists(name)) {
      return false
    }

    delete members[name]
    return true
  }

  /**
   * 新しいイベントを追加
   *
   * @param member メンバー名
   * @param data イベントデータ
   * @return 成功の場合 true を返却、メンバーが存在しない場合 false を返却
   */
  function addEvent(member: string, data: GCEvent) {
    if (!memberExists(member)) {
      return false
    }

    members[member].push({
      // 次の id は最後の id + 1
      id: (members[member][members[member].length - 1]?.id || 0) + 1,
      memberName: member,
      ...data
    })
    return true
  }

  /**
   * 特定メンバーのイベントを削除
   *
   * @param member メンバー名
   * @param eventId イベントID
   * @return 成功の場合 true を返却、メンバーが存在しない場合 false を返却
   */
  function deleteEvent(member: string, eventId: number) {
    if (!memberExists(member)) {
      return false
    }

    members[member] = members[member].filter((evt) => evt.id != eventId)
    return true
  }

  return { members, memberExists, addMember, deleteMember, addEvent, deleteEvent }
})

export const initialState = {
  // ダミーデータ
  山田花子: [
    {
      id: 1,
      memberName: '山田花子',
      title: '内部打合わせ',
      detail: 'ABC 案件\n EF 会議室',
      start: format(new Date(), 'yyyy-MM-dd'),
      end: format(new Date(), 'yyyy-MM-dd')
    },
    {
      id: 2,
      memberName: '山田花子',
      title: '出張：東京支社執務',
      detail:
        '表裏自力こう発展をしう手この書これかお話にというお相談ましですうだて、\nその今日は私か一般がたがなるて',
      start: format(new Date(), 'yyyy-MM-dd'),
      end: format(addDays(new Date(), 3), 'yyyy-MM-dd')
    },
    {
      id: 3,
      memberName: '山田花子',
      title: '休み',
      detail: '私用',
      start: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
      end: format(addDays(new Date(), 4), 'yyyy-MM-dd')
    }
  ],
  山田太郎: [
    {
      id: 1,
      memberName: '山田太郎',
      title: '外出：健康診断',
      detail:
        'その英語には進んだのに\nという二つに探しけれどもおきましう。\nこの時自力のためそのがたは\n何いっぱいがしでかと岡田君へしなた',
      start: format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      end: format(addDays(new Date(), 1), 'yyyy-MM-dd')
    }
  ],
  何野某: [],
  権兵衛: [
    {
      id: 1,
      memberName: '権兵衛',
      title: 'テレカン：アイウエオ 案件キックオフMTG',
      detail: 'ウォーズウォースの日から国家にその間でもの個性に半分這入ってくると',
      start: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      end: format(addDays(new Date(), 2), 'yyyy-MM-dd')
    }
  ]
}
