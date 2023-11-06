import FContact from "./Fabi";
import OContact from "./Oabi";
type numberAny = {
  [key: number]: any;
};
const contract: numberAny = {
  12306: FContact,
  65: OContact,
};
export default contract;
