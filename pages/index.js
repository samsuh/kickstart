import React, { Component } from "react";
import factory from "../ethereum/factory";

class CampaignIndex extends Component {
  //SSR cannot make use of componentDidMount. NextJS uses getInitialProps to get the initial data, and sends it down to the componenet that will render HTML SSR
  // 'static' keyword instantiates the class itself. do not have to create an instance.Next wants to run it without attempting to render.
  static async getInitialprops() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns: campaigns };
    //now this object is sent to our component CampaignIndex as props, and can be accessed on "this.props.campaigns"
  }
  // async componentDidMount() {
  //   // get all deployed campaigns
  //   const campaigns = await factory.methods.getDeployedCampaigns().call();
  //   console.log("campaigns list: ", campaigns);
  // }
  render() {
    return <div>{this.props.campaigns[0]}</div>;
  }
}

export default CampaignIndex;
