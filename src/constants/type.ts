export enum TypeAccount {
  CLEANER = "CLEANER",
  CUSTOMER = "CUSTOMER",
}

export enum OrderType {
  PICKUP = "PICKUP",
  CLEANER = "CLEANER",
  ROUTINE_PICKUP = "ROUTINE_PICKUP",
}
export type QueryHook = {
  data: any
  status: "error" | "success" | "pending"
  isFetching: boolean
}

export enum OrderStatus {
  ONGOING = "ONGOING",
  ONTAKING = "ONTAKING",
  ONGOING_SEND = "ONGOING_SEND",
  DONE = "DONE",
}

export type TTrash = {
  totalTrash: number
  totalXp: number
  detailTrash: {
    name: string
    total: number
  }[]
}

export type NullishExtractor<T> = Exclude<T, undefined | null>
