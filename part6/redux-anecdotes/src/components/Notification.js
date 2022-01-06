import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  const notification = props.notification;
  return <div style={style}>{notification}</div>;
};

const mapStateToProps = ({ notification }) => ({ notification });

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
