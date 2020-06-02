import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import factory from "../ethereum/factory";
import Layout from "../components/Layout";

class CampaignIndex extends Component {
  //SSR cannot make use of componentDidMount. NextJS uses getInitialProps to get the initial data, and sends it down to the componenet that will render HTML SSR
  // 'static' keyword instantiates the class itself. do not have to create an instance.Next wants to run it without attempting to render.
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
    // now this object is sent to our component CampaignIndex as props, and can be accessed on "this.props.campaigns"
  }
  // async componentDidMount() {
  //   // get all deployed campaigns
  //   const campaigns = await factory.methods.getDeployedCampaigns().call();
  //   console.log("campaigns list: ", campaigns);
  // }

  renderCampaigns() {
    //return a list of objects where each object represents a single <Card/> to render on screen
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: <a>View Campaign</a>,
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>
          <Button
            content="Create Campaign"
            icon="add circle"
            primary
            floated="right"
          />
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
    // {this.props.campaigns[0]}
    // return <div>Index component here</div>;
  }
}

export default CampaignIndex;
