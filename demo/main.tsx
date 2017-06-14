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

const selectableTypes = [
  'image/png', 'image/jpeg', 'image/gif', 'image/webp',
  'video/webm', 'video/mp4', 'video/ogg', 'video/quicktime'
];

interface IPropTypes {

}

interface IStateTypes {
  types: string[];
  multiple: boolean;
  imageConstraint: {
    maxBytesPerPixel: number,
    maxSize: number,
    maxWidth: number,
    useMaxWidth: boolean
  };
  videoConstraint: {
    maxBytesPerPixelPerSecond: number,
    maxSize: number,
    maxWidth: number,
    useMaxWidth: boolean,
    maxDuration: number
  };
}

class Demo extends Component<IPropTypes, IStateTypes> {
  public state: IStateTypes = {
    types: [],
    multiple: false,
    imageConstraint: {
      maxBytesPerPixel: 0.5,
      maxSize: 1280 * 720,
      maxWidth: 1280,
      useMaxWidth: false
    },
    videoConstraint: {
      maxBytesPerPixelPerSecond: 0.5,
      maxSize: 1280 * 720,
      maxWidth: 1280,
      useMaxWidth: false,
      maxDuration: 10
    }
  }

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

  private renderTypesSelect = () => {
    const {
      types
    } = this.state;
  }

  private renderImageConstraint = () => {
    const {
      maxBytesPerPixel,
      maxSize,
      maxWidth,
      useMaxWidth
    } = this.state.imageConstraint;

    return (
      <div className={'constraint-list'}>
        <div className={'constraint-item'}>

        </div>
        <div className={'constraint-item'}>

        </div>
      </div>
    )
  }

  private renderVideoConstraint = () => {
    return (
      <div className={'constraint-video'}>

      </div>
    )
  }

  private renderViewTable = () => {

  }
}

render(
  <Demo />,
  document.getElementById('container')
);
