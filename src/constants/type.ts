export enum TypeAccount {
  CLEANER = "CLEANER",
  CUSTOMER = "CUSTOMER",
}

export enum OrderType {
  PICKUP = "PICKUP",
  CLEANER = "CLEANER",
  ROUTINE_PICKUP = "ROUTINE_PICKUP",
}
export type QueryHook = { data: any; status: "error" | "success" | "pending"; isFetching: boolean; };

