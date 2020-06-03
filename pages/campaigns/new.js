import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes"; //dont need Link

class CampaignNew extends Component {
  //whenever we want to handle user input, create new piece of state in this component, and add a changeHandler function on the input itself; any change updates state, which rerenders input with new state.
  // once input works properly in React, we can add a function to handle submit on the Form.
  state = {
    minimumContribution: "",
    errorMessage: "",
    loading: false,
  };

  //define new function to handle submit. use arrow function to avoid problems with binding the function to 'this'
  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    try {
      //actually create a new campaign by submitting this form.
      // import factory instance, call "createCampaign(minimum)" from CampaignFactory to create a new Campaign on the blockchain. User pays gas.
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0],
        });

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={(event) =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
