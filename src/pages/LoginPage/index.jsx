import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import InputFieldGroup from 'InputFieldGroup';
import { validateEmail, validatePassword } from 'lib/loginValidation';
import logo from 'global/images/ganna.png';
// Service
import { loginService } from 'services/api/login';
// Recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState } from 'recoil/atoms';
import { loginSelector } from 'recoil/action';

const LoginPage = () => {
  const history = useHistory();
  // Set States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [auth, setAuth] = useRecoilState(loginState);
  const token = useRecoilValue(loginSelector);

  const validateInputs = () => {
    setEmailError(validateEmail(email));
    setPasswordError(validatePassword(password));
  }
  const handleSubmit = async () => {
    validateInputs();
    setLoader(true);
    const login = await loginService(email, password);
    if (login && login.token) {
      sessionStorage.setItem(
        'sessionToken',
        login.token,
        );
        setAuth(login.token);
        history.push('/home')
        // console.log(token);
      }
      setLoader(false);
  }
  //  useEffect(() => {
  //   //  console.log(auth)

  //  }, [auth])

  // useEffect(() => {
  //   sessionStorage.getItem('sessionToken') ?
  //   history.push('/home'): ''; 

  // }, [])
  return (
    <Container className="vh-100">
      <Row className="align-items-center justify-content-center text-left h-100">
        <Col xs={6}>
          <div className="text-center">
            <img className="w-25" src={logo} alt='logo' />
          </div>
          <Form>
            <InputFieldGroup
              label={"Email address"}
              type={"email"}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={(event) =>
                setEmailError(validateEmail(event.target.value))
              }
              error={emailError}
              value={email}
              placeholder={"Enter email"}
            />
            <InputFieldGroup
              label={"Password"}
              type={"password"}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={(event) =>
                setPasswordError(validatePassword(event.target.value))
              }
              error={passwordError}
              value={password}
              placeholder={"Password"}
            />
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            {loader ?
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              :
              <Button variant="primary" type="button"
                disabled={passwordError || emailError}
                onClick={handleSubmit}>
                Login
            </Button>
            }
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
