import { Interface, InterfaceAbi } from "ethers";

type objKeyObjectType = {
  [key: string]: { address: string; abi: Interface | InterfaceAbi };
};
const VRFCoordinatorV2 = require("@/abi/VRFCoordinatorV2.json");

let OContact: objKeyObjectType = {
  VRFCoordinatorV2: { abi: VRFCoordinatorV2, address: "" },
};
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  //开发环境
  OContact.VRFCoordinatorV2.address = "0x9B084863b8D59b2282CC5fb8A086A2829EB0708F";
} else if (process.env.NODE_ENV === "test") {
  // 测试环境
  OContact.VRFCoordinatorV2.address = "0x9B084863b8D59b2282CC5fb8A086A2829EB0708F";
} else {
  //生产环境
  OContact.VRFCoordinatorV2.address = "";
}
export default OContact;
