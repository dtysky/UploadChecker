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
  };
  videoConstraint: {
    maxBytesPerPixelPerSecond: number,
    maxSize: number,
    maxWidth: number,
    maxDuration: number
  };
  info: {
    error?: string;
    type?: string;
    width?: number;
    height?: number;
    size?: number;
    duration?: number;
  }
}

class Demo extends Component<IPropTypes, IStateTypes> {
  public state: IStateTypes = {
    types: [],
    multiple: true,
    imageConstraint: {
      maxBytesPerPixel: 0.5,
      maxSize: 1280 * 720,
      maxWidth: 0
    },
    videoConstraint: {
      maxBytesPerPixelPerSecond: 0.5,
      maxSize: 1280 * 720,
      maxWidth: 0,
      maxDuration: 10
    },
    info: {}
  }

  private handleDrop = res => {
    if (res.error) {
      this.setState({
        info: {
          ...res.info,
          error: res.error.message
        }
      });
    } else {
      this.setState({info: res.info});
    }
  }

  public render() {
    const {
      types
    } = this.state;
    const {
      ...imageConstraint
    } = this.state.imageConstraint;
    const {
      ...videoConstraint
    } = this.state.videoConstraint;

    return (
      <div
        className={'root'}
      >
        <UploadChecker
          className={'upload'}
          types={types}
          onDrop={this.handleDrop}
          imageConstraint={imageConstraint}
          videoConstraint={videoConstraint}
        >
          Upload
        </UploadChecker>
        <h3>Types</h3>
        {this.renderTypesSelect()}
        <h3>ImageConstraint</h3>
        {this.renderImageConstraint()}
        <h3>VideoConstraint</h3>
        {this.renderVideoConstraint()}
        <h3>Info</h3>
        {this.renderViewTable()}
      </div>
    );
  }

  private renderTypesSelect = () => {
    const {
      types
    } = this.state;

    return (
      <div className={'constraint-types'}>
        {
          selectableTypes.map(type => (
            <div
              key={type}
              className={'constraint-item'}
            >
              <label htmlFor="input">
                {type}
              </label>
              <input
                type="checkbox"
                checked={types.indexOf(type) >= 0}
                onChange={() => {
                  const index = types.indexOf(type);
                  if (index < 0) {
                    types.push(type);
                  } else {
                    types.splice(index, 1);
                  }
                  this.forceUpdate();
                }}
              />
            </div>
          ))
        }
      </div>
    );
  }

  private renderImageConstraint = () => {
    return (
      <div className={'constraint-list'}>
        {
          ['maxBytesPerPixel', 'maxSize', 'maxWidth'].map(key => (
            <div
              key={key}
              className={'constraint-item'}
            >
              <label htmlFor="input">
                {key}
              </label>
              <input
                type="text"
                value={this.state.imageConstraint[key]}
                onChange={e => {
                  this.state.imageConstraint[key] = e.target.value;
                  this.forceUpdate();
                }}
              />
            </div>
          ))
        }
      </div>
    );
  }

  private renderVideoConstraint = () => {
    return (
      <div className={'constraint-list'}>
        {
          ['maxBytesPerPixelPerSecond', 'maxSize', 'maxWidth', 'maxDuration'].map(key => (
            <div
              key={key}
              className={'constraint-item'}
            >
              <label htmlFor="input">
                {key}
              </label>
              <input
                type="text"
                value={this.state.videoConstraint[key]}
                onChange={e => {
                  this.state.videoConstraint[key] = e.target.value;
                  this.forceUpdate();
                }}
              />
            </div>
          ))
        }
      </div>
    );
  }

  private renderViewTable = () => {
    const {
      info
    } = this.state;

    return (
      <table className={'info'}>
        <tbody>
        {
          ['error', 'type', 'width', 'height', 'size', 'duration'].map(key => {
            if (info[key]) {
              return (
                <tr key={key}>
                  <th>{key}</th>
                  <td>{info[key]}</td>
                </tr>
              )
            }
          })
        }
        </tbody>
      </table>
    );
  }
}

render(
  <Demo />,
  document.getElementById('container')
);
