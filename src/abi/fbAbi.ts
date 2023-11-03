import { Interface, InterfaceAbi } from "ethers";

type objKeyObjectType = {
  [key: string]: { address: string; abi: Interface | InterfaceAbi };
};
const erc20 = require("@/abi/erc20.json");

let FBcontract: objKeyObjectType = {
  // 合约
  erc20: { abi: erc20, address: "" },
};
if (process.env.NODE_ENV === "development") {
  //开发环境
  FBcontract.erc20.address = "";
} else {
  //生产环境
  FBcontract.erc20.address = "";
}
export default FBcontract;
