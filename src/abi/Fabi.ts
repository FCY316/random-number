import { Interface, InterfaceAbi } from "ethers";

type objKeyObjectType = {
  [key: string]: { address: string; abi: Interface | InterfaceAbi };
};
const VRFCoordinatorV2 = require("@/abi/VRFCoordinatorV2.json");

let FContact: objKeyObjectType = {
  VRFCoordinatorV2: { abi: VRFCoordinatorV2, address: "" },
};
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  //开发环境
  FContact.VRFCoordinatorV2.address = "";
} else if (process.env.NODE_ENV === "test") {
  // 测试环境
  FContact.VRFCoordinatorV2.address = "";
} else {
  //生产环境
  FContact.VRFCoordinatorV2.address = "";
}
export default FContact;
