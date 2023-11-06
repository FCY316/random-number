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
  OContact.VRFCoordinatorV2.address = "0x79aA4C332885A1D8789566d55A43633fD8823470";
} else if (process.env.NODE_ENV === "test") {
  // 测试环境
  OContact.VRFCoordinatorV2.address = "0x79aA4C332885A1D8789566d55A43633fD8823470";
} else {
  //生产环境
  OContact.VRFCoordinatorV2.address = "";
}
export default OContact;
