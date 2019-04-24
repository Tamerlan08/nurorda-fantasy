import React from 'react';
import { Button, Carousel } from 'react-bootstrap';
import styled from 'styled-components';
import { LinkContainer } from 'react-router-bootstrap';
import { lighten, darken } from 'polished';

const StyledIndex = styled.div`
  padding: 20px;
  text-align: center;
  border-radius: 3px;
  color: #fff;

  .buttons{
    display: block;
  }
  .signupbutton{
    width: 20%;
  }
  .loginbutton{
    width: 20%;
  }
  .indexh1 {
    font-size: 48px;
    color: #ed3137;
  }
  h4 {
    color: #FFFFFF;
  }
  .imgslide{
    width: 700px;
    height: 700px;
  }
  .indexp {
    font-size: 36px;
    color: #1c5393;
  }
  .indeximg{
    width: 25%;
    height: 25%;
  }
  .nextmatchindex{
    width: 68%;
  }

  > div {
    display: inline-block;
    margin: 10px 0 0;

    .btn:first-child {
      margin-right: 10px;
    }

    .btn {
      border: none;
    }
  }

  .invis {
    background: transparent;
    border: none !important;
    font-size:0;
  }

  @media screen and (min-width: 768px) {
    padding: 30px;

    footer {
      margin: 30px -30px -30px;
    }
  }

  @media screen and (min-width: 992px) {
    padding: 40px;

    footer {
      margin: 40px -40px -40px;
    }
  }
  @media screen and (max-width: 992px){
    .indeximg{
      width: 25%;
      height: 25%;
    }
    .indexh1 {
      font-size: 24px;
      color: #ed3137;
    }
    .indexp {
      font-size: 18px;
      color: #1c5393;
    }
    .nextmatchindex{
      width: 100%;
    }
  }
`;

const Index = () => (
  <StyledIndex>
    <img className="indeximg"
      src="https://pbs.twimg.com/profile_images/542279015935905793/tSXd8zJC_400x400.png"
      alt="Nurorda"
      width="300px"
      hight="300px"
    />
    <br></br>
    <h1 className="indexh1">Nurorda Fantasy</h1>
    <p className="indexp">Football fantasy of Nurorda</p>
    <br></br>
    <div className="buttons">
      <Button href="https://www.nurorda.kz/">School page</Button>
      <Button href="https://goo.gl/forms/M14nQzVXHcDw3n7D2"><i className="fa fa-star"/> Leave a feedback!</Button>
    </div>
    <hr></hr>
    <div className="buttons">
    <LinkContainer to="/signup">
      <Button bsStyle="info" href="/signup">Sign Up</Button>
    </LinkContainer>
    <LinkContainer to="/login">
      <Button bsStyle="info" href="/login">Log In</Button>
    </LinkContainer>
    </div>
    <hr></hr>
  </StyledIndex>
);

export default Index;
