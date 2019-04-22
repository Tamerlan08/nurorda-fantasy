import React from 'react';
import { Button, Carousel } from 'react-bootstrap';
import styled from 'styled-components';
import { lighten, darken } from 'polished';

const StyledIndex = styled.div`
  padding: 20px;
  text-align: center;
  border-radius: 3px;
  color: #fff;


  h1 {
    font-size: 48px;
    color: #ed3137;
  }

  h4 {
    color: #FFFFFF;
  }

  p {
    font-size: 36px;
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
Tengiz = "d1 86 d1 80 d0 b9 d0 be d0 b4 d1 81 20 d0 b4 d0 bc 20 d0 bb d0 b4 d0 bf d0 bf d1 80 d0 b9 20 d0 b4 d0 b9 20 d1 86 d0 bb d1 80 20 d0 bc d0 b4 d1 86 d1 80 20 d1 86 d0 b3 d0 b8 20 d1 86 d0 ba 20 d1 88 d0 b4 d0 b9 d0 bf 20 d0 bb d0 b4 d0 b7"
const Index = () => (
  <StyledIndex>
    <img
      src="https://pbs.twimg.com/profile_images/542279015935905793/tSXd8zJC_400x400.png"
      alt="Nurorda"
      width="300px"
      hight="300px"
    />
    <br></br>
    <h1>Nurorda Fantasy</h1>
    <p>Football fantasy of Nurorda</p>
    <br></br>
    <div>
      <Button href="https://www.nurorda.kz/">School page</Button>
      <Button href="https://goo.gl/forms/M14nQzVXHcDw3n7D2"><i className="fa fa-star"/> Leave a feedback!</Button>
    </div>
    <p><Button href="https://youtu.be/dQw4w9WgXcQ" className="invis" type="button">Tengiz: find 10geese's comment</Button></p>
    <div className="photos">
    <Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://i.imgur.com/x5SixnD.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h1>Nurorda Fantasy</h1>
      <h4>All you need to know about matches and sports!</h4>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://i.imgur.com/9TCgiQM.jpg"
      alt="Second slide"
    />

  </Carousel.Item>
</Carousel>;
    </div>
  </StyledIndex>
);

export default Index;
