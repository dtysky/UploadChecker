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
    if (res.error) {
      alert(res.error.message);
    }
  }

  public render() {
    return (
      <div
        className={'root'}
      >
        <UploadChecker
          className={'upload'}
          types={['image/jpeg']}
          onDrop={this.handleDrop}
        >
          Upload
        </UploadChecker>
      </div>
    );
  }
}

render(
  <Demo />,
  document.getElementById('container')
);
