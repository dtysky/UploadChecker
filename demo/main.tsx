/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/3
 * Description:
 */
import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';

import './main.css';

interface IPropTypes {

}

interface IStateTypes {

}

class Demo extends Component<IPropTypes, IStateTypes> {
  public render() {
    return (
      <div></div>
    );
  }
}

render(
  <Demo />,
  document.getElementById('container')
);
