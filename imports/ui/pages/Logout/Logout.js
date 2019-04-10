import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';
import { Meteor } from 'meteor/meteor';
import Icon from '../../components/Icon/Icon';

const StyledLogout = styled.div`
  padding: 20px;
  text-align: center;
  border-radius: 3px;
  color: #fff;

  img {
    width: 100px;
    height: auto;
  }

  h1 {
    font-size: 24px;
    color: #ed3137;
  }

  p {
    font-size: 16px;
    line-height: 22px;
    color: ${lighten(0.25, '#4285F4')};
  }

  ul {
    list-style: none;
    display: inline-block;
    padding: 0;
    margin: 10px 0 0;
  }

  ul li {
    float: left;
    font-size: 28px;
    line-height: 28px;

    a {
      color: #ed3137;
    }

    &:not(:last-child) {
      margin-right: 15px;
    }
  }

  @media screen and (min-width: 768px) {
    padding: 30px;

    h1 {
      font-size: 26px;
      color: #ed3137;
    }
  }

  @media screen and (min-width: 992px) {
    padding: 40px;

    h1 {
      font-size: 28px;
      color: #ed3137;
    }

    p {
      font-size: 18px;
      line-height: 24px;
      color: #1c5393;
    }
  }
`;

const { productName, twitterUsername, facebookUsername } = Meteor.settings.public;

class Logout extends React.Component {
  componentDidMount() {
    Meteor.logout(() => this.props.setAfterLoginPath(null));
  }

  render() {
    return (
      <StyledLogout>
        <img
          src="https://pbs.twimg.com/profile_images/542279015935905793/tSXd8zJC_400x400.png"
          alt="Clever Beagle"
        />
        <h1>Stay safe out there</h1>
        <p>{`Don't forget to like and follow Nurorda elsewhere on the web:`}</p>
        <ul className="FollowUsElsewhere">
          <li><a href={`https://instagram.com/nurorda.kz?utm_source=ig_profile_share&igshid=s030f8o31pr7`}><Icon iconStyle="brand" icon="instagram" /></a></li>
          <li><a href={`https://www.youtube.com/user/nurordatv`}><Icon iconStyle="brand" icon="youtube" /></a></li>
        </ul>
      </StyledLogout>
    );
  }
}

Logout.propTypes = {
  setAfterLoginPath: PropTypes.func.isRequired,
};

export default Logout;
