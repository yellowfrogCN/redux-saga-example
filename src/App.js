import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Card } from 'antd';
import * as actions from './actions/homeAction';
const { Meta } = Card;

class App extends Component {
  // 取消
  handleToCancel = () => {
    const { cancelRequestAction } = this.props.bundleAction;
    cancelRequestAction();
  }
  // 请求
  handleToGetData = (userName) => {
    const { requestDataAction } = this.props.bundleAction;
    requestDataAction(userName, 'REQUEST');
  }
  render() {
    const { avatar_url, name, description, loading } = this.props.homeReducer;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">yf 狠 帅！！！</h1>
        </header>
        <div className='content'>
          <Card
              style={{ width: 300 }}
              cover={<img alt='Dan' src={avatar_url} />}
              loading={loading}
              actions={[
                <Button type='primary' onClick={() => this.handleToGetData('gaearon')}>开始异步请求</Button>,
                <Button type='danger' onClick={this.handleToCancel}>取消异步请求</Button>,
              ]}
            >
              <Meta
                title={name}
                description={description}
              />
          </Card>
        </div>
      </div>
    );
  }
}
const mapStatesToProps = (state) => {
  return {
    homeReducer: state.homeReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    bundleAction: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(App);
