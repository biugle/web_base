/*
 * @Author: HxB
 * @Date: 2023-04-27 15:24:56
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-25 18:04:30
 * @Description: class 模板
 * @FilePath: \web_base\_template_\app-class.tsx
 */
import React, { Component } from 'react';

class AppBase extends Component<{ title: string }, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
  }

  componentWillUnmount() {
    // do something
  }

  render() {
    return <div data-component="AppBase">{this.props.title}</div>;
  }
}

export default AppBase;
