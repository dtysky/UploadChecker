/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/3
 * Description:
 */
import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';

import './main.css';
import UploadChecker from '../index';

interface IPropTypes {

}

interface IStateTypes {

}

class Demo extends Component<IPropTypes, IStateTypes> {
  private handleDrop = res => {
    console.log(res);
  }

  public render() {
    return (
      <UploadChecker
        types={['image/jpeg']}
        style={{
          width: 64,
          height: 64,
          background: '#000'
        }}
        onDrop={this.handleDrop}
      />
    );
  }
}

render(
  <Demo />,
  document.getElementById('container')
);
