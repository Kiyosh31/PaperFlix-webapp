import React, { Component, useState } from "react";

import Background from "components/Background/Background";
import Header from "components/Header/Header";
import Box from "components/Box/Box";
import Title from "components/Title/Title";
import Form from "components/Form/Form";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import CheckBox from "components/CheckBox/CheckBox";
import Link from "components/Link/Link";

class Login extends Component {
  // const [username, setUsername] = useState([]);
  // const [password, setPassword] = useState([]);

  render() {
    return (
      <Background>
        <Header />
        <Box>
          <Title title="Sing In" />
          <Form>
            <Input placeholder="Username" />
            <Input placeholder="Password" />
            <Button text="Sign In" />
            <CheckBox text="Remember me" />
          </Form>
          <Link question="New in Paperflix?" text="Register" />
        </Box>
      </Background>
    );
  }
}

export default Login;
