import React, { Component } from "react";

import Background from "components/Background/Background";
import Header from "components/Header/Header";
import Box from "components/Box/Box";
import Title from "components/Title/Title";
import Form from "components/Form/Form";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import CheckBox from "components/CheckBox/CheckBox";
import Link from "components/Link/Link";

import BackgroundImage from "assets/img/register.jpg";

class Register extends Component {
  render() {
    return (
      <Background image={BackgroundImage}>
        <Header />
        <Box>
          <Title title="Register" />
          <Form>
            <Input type="text" placeholder="Name" />
            <Input type="text" placeholder="Mail" />
            <Input type="text" placeholder="Password" />
            <Input type="text" placeholder="Confirm Password" />
            <Button text="Register" />
          </Form>
          <Link question="Have an account?" text="Sign In" />
        </Box>
      </Background>
    );
  }
}

export default Register;
