/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/11
 * Description:
 */
import  * as React from 'react';
import {Component, MouseEvent} from 'react';

import {
  TFileTypes, imageRegex, videoRegex, ICheckRespones
} from './types';
import {checkType} from './TypeChecker';
import {checkImage} from './ImageChecker';
import {checkVideo} from './VideoChecker';

interface IPropTypes {
  types: TFileTypes;
  multiple?: boolean;
  onDrop?: (res: ICheckRespones) => any;
  children?: JSX.Element | string;
  className?: string;
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
              .then(res => onDrop(res))
              .catch(res => onDrop(res));
          } else if (videoLimit && videoRegex.test(file.type)) {
            checkVideo(
              file,
              videoLimit.maxBytesPerPixelPerSecond,
              videoLimit.maxSize,
              videoLimit.maxWidth,
              videoLimit.maxDuration
            )
              .then(res => onDrop(res))
              .catch(res => onDrop(res));
          } else {
            onDrop({file, info: {type: file.type}});
          }
        })
        .catch(res => onDrop(res));
    }
  }

  public render() {
    const {
      multiple,
      children,
      style,
      className
    } = this.props;

    return (
      <div
        onClick={() => {
          (this.refs.input as HTMLInputElement).click();
        }}
        className={className}
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
