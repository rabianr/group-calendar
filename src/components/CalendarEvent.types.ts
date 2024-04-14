export interface GCEvent {
  /**
   * イベントID
   */
  id?: number
  /**
   * メンバー名
   */
  memberName?: string
  /**
   * タイトル
   */
  title: string
  /**
   * 内容
   */
  detail: string
  /**
   * 開始時間
   */
  start: string
  /**
   * 終了時間
   */
  end: string
}

export interface DisplayEvent extends GCEvent {
  /**
   * 横方向のセルの連結
   */
  colspan: number
  /**
   * セル内の配置位置、0から
   */
  pos: number
  /**
   * 最後フラグ
   */
  last: boolean
}
