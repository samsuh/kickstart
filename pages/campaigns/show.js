//show user details about a particular campaign
import React, { Component } from "react";
import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    // console.log(props.query.address);
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();
    // console.log(summary); we will label each field from getInitialProps fx for readability. access using 'this.props.balance'
    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props;
    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign can create Funding Requests to withdraw funds",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution Amount in wei",
        description:
          "You must contribute at least this much to become an approver",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description: "Requests to withdraw funds upon approval",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description: "Number of Approvers who have already donated",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance in ETH",
        description: "The ETH balance in this campaign",
      },
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>CampaignShow Component</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={this.props.address} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link route={`/campaigns/${this.props.address}/requests`}>
                <a>
                  <Button primary> View Requests </Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
