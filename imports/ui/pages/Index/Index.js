import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { lighten, darken } from 'polished';

const StyledIndex = styled.div`
  padding: 20px;
  text-align: center;
  border-radius: 3px;
  color: #fff;

  img {
    width: 100px;
    height: 100px;
  }

  h1 {
    font-size: 28px;
    color: #ed3137;
  }

  p {
    font-size: 18px;
    color: #1c5393;
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
`;

console.log("205147926");
const Index = () => (
  <StyledIndex>
    <img
      src="https://pbs.twimg.com/profile_images/542279015935905793/tSXd8zJC_400x400.png"
      alt="Nurorda"
    />
    <h1>Nurorda Fantasy</h1>
    <p>Football fantasy of Nurorda.</p>
    <div>
      <Button href="https://nurorda.kz/">School page</Button>
      <Button href="https://goo.gl/forms/M14nQzVXHcDw3n7D2"><i className="fa fa-star"/> Leave a feedback!</Button>
    </div>
    <p><Button href="https://youtu.be/dQw4w9WgXcQ" className="invis" type="button">Tengiz</Button></p>
  </StyledIndex>
);

export default Index;
