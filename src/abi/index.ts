import FBcontract from "./fbAbi";
type numberAny = {
  [key: number]: any;
};
const contract: numberAny = {
  12306: FBcontract,
};
export default contract;
