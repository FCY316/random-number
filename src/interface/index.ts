export interface stringKey{
  [key: string]: string;
}
export interface numberKey{
  [key: number]: string;
}
export interface MyResponseType<T = any> {
  code: number;
  msg: string;
  data: T;
}
export interface subscribeListType{
    state: number,
    id:number,
    administrator: string,
    creationTime: string,
    consumer: string,
    balance: number
}