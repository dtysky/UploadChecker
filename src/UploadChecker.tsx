/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/11
 * Description:
 */
import  * as React from 'react';
import {Component, MouseEvent, ChangeEvent} from 'react';

import {
  TFileTypes, TFile, ICheckError, imageRegex, videoRegex
} from './types';
import {checkType} from './TypeChecker';
import {checkImage} from './ImageChecker';
import {checkVideo} from './VideoChecker';

interface IPropTypes {
  types: TFileTypes;
  multiple?: boolean;
  onDrop?: (res: {
    file: TFile,
    error?: ICheckError
  }) => any;
  children?: JSX.Element;
  style?: any;
  imageLimit?: {
    maxBytesPerPixel: number,
    maxSize: number,
    maxWidth?: number
  },
  videoLimit?: {
    maxBytesPerPixelPerSecond: number,
    maxSize: number,
    maxWidth?: number,
    maxDuration: number
  }
}

interface IStateTypes {

}

export default class UploadChecker extends Component<IPropTypes, IStateTypes> {
  static defaultProps: IPropTypes = {
    types: [],
    multiple: false,
    onDrop: () => {}
  };

  private handleDrop = (e: any) => {
    const {
      types,
      imageLimit,
      videoLimit,
      onDrop
    } = this.props;

    let files;

    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      checkType(file, types)
        .then(() => {
          if (imageLimit && imageRegex.test(file.type)) {
            checkImage(
              file,
              imageLimit.maxBytesPerPixel,
              imageLimit.maxSize,
              imageLimit.maxWidth
            )
              .then(() => onDrop({file}))
              .catch(error => onDrop({file, error}));
          } else if (videoLimit && videoRegex.test(file.type)) {
            checkVideo(
              file,
              videoLimit.maxBytesPerPixelPerSecond,
              videoLimit.maxSize,
              videoLimit.maxWidth,
              videoLimit.maxDuration
            )
              .then(() => onDrop({file}))
              .catch(error => onDrop({error, file}));
          } else {
            onDrop({file});
          }
        })
        .catch(error => onDrop({error, file}));
    }
  }

  public render() {
    const {
      multiple,
      children,
      style
    } = this.props;

    return (
      <div
        onClick={() => {
          (this.refs.input as HTMLInputElement).click();
        }}
        style={style}
      >
        <input
          ref={'input'}
          type="file"
          style={{
            display: 'none'
          }}
          multiple={multiple}
          onClick={(e: MouseEvent<HTMLInputElement>) => {
            // clean value to select the same file continuous
            (e.target as HTMLInputElement).value = null;
          }}
          onChange={this.handleDrop}
        />
        {children}
      </div>
    );
  }
}
