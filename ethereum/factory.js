//preconfigured instance of our CampaignFactory
import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  //old way: //   JSON.parse(CampaignFactory.interface),
  CampaignFactory.abi,
  "0x9a5a15446777C429afbD9ab1273A773966ECB535"
);

export default instance;
