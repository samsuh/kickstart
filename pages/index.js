import React, { Component } from "react";
import factory from "../ethereum/factory";

class CampaignIndex extends Component {
  async componentDidMount() {
    // get all deployed campaigns
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log("campaigns list: ", campaigns);
  }
  render() {
    return <div>Campaigns Index Renders Here</div>;
  }
}

export default CampaignIndex;
