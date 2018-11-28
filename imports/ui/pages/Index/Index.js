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
    width: auto;
    height: auto;
  }

  h1 {
    font-size: 28px;
  }

  p {
    font-size: 18px;
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
      <Button href="https://google.kz/"><i className="fa fa-star" />Leave a feedback!</Button>
    </div>
  </StyledIndex>
);

export default Index;
