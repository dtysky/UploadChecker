/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/3
 * Description:
 */
import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Checkbox from 'semantic-ui-react/dist/commonjs/modules/Checkbox';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form';

import './main.css';
import UploadChecker from '../index';

const selectableTypes = [
  'image/png', 'image/jpeg', 'image/gif', 'image/webp',
  'video/webm', 'video/mp4', 'video/ogg', 'video/quicktime'
];

interface IPropTypes {

}

interface IStateTypes {
  types?: string[];
  multiple?: boolean;
  imageConstraint?: {
    maxBytesPerPixel: number,
    maxSize: number,
    maxWidth: number,
  };
  videoConstraint?: {
    maxBytesPerPixelPerSecond: number,
    maxSize: number,
    maxWidth: number,
    maxDuration: number
  };
  info?: {
    error?: string;
    type?: string;
    width?: number;
    height?: number;
    size?: number;
    duration?: number;
  };
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
        <div className={'topbar'}>
          <a
            href={'https://github.com/dtysky/UploadChecker'}
            target={'_blank'}
          >
            View on Github
          </a>
        </div>
        <div className={'content'}>
          <UploadChecker
            className={'upload'}
            types={types}
            onDrop={this.handleDrop}
            imageConstraint={imageConstraint}
            videoConstraint={videoConstraint}
          >
            Click to choose file
          </UploadChecker>
          <Card.Group className={'card-group'}>
            <Card>
              <Card.Content>
                <Card.Header>
                  Types
                </Card.Header>
                <Card.Meta>
                  File types, if noting be chosen, all files are allowed.
                </Card.Meta>
                <Card.Description>
                  {this.renderTypesSelect()}
                </Card.Description>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Card.Header>
                  ImageConstraint
                </Card.Header>
                <Card.Meta>
                  Constraints for image files.
                </Card.Meta>
                <Card.Description>
                  {this.renderImageConstraint()}
                </Card.Description>
              </Card.Content>
            </Card>
            <Card>
              <Card.Content>
                <Card.Header>
                  VideoConstraint
                </Card.Header>
                <Card.Meta>
                  Constraints for video files.
                </Card.Meta>
                <Card.Description>
                  {this.renderVideoConstraint()}
                </Card.Description>
              </Card.Content>
            </Card>
          </Card.Group>
          <Card className={'card-info'}>
            <Card.Content>
              <Card.Header>
                Info
              </Card.Header>
              <Card.Description>
                {this.renderViewTable()}
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
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
              <Checkbox
                label={type}
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
      <Form className={'constraint-list'}>
        {
          ['maxBytesPerPixel', 'maxSize', 'maxWidth'].map(key => (
            <Form.Field
              key={key}
              className={'constraint-item'}
            >
              <Label pointing={'below'}>
                {key}
              </Label>
              <Input
                value={this.state.imageConstraint[key]}
                onChange={(e, data) => {
                  this.state.imageConstraint[key] = data.value;
                  this.forceUpdate();
                }}
              />
            </Form.Field>
          ))
        }
      </Form>
    );
  }

  private renderVideoConstraint = () => {
    return (
      <Form className={'constraint-list'}>
        {
          ['maxBytesPerPixelPerSecond', 'maxSize', 'maxWidth', 'maxDuration'].map(key => (
            <Form.Field
              key={key}
              className={'constraint-item'}
            >
              <Label pointing={'below'}>
                {key}
              </Label>
              <Input
                value={this.state.videoConstraint[key]}
                onChange={(e, data) => {
                  this.state.videoConstraint[key] = data.value;
                  this.forceUpdate();
                }}
              />
            </Form.Field>
          ))
        }
      </Form>
    );
  }

  private renderViewTable = () => {
    const {
      info
    } = this.state;

    return (
      <Table celled className={'info'}>
        <Table.Header className={info.error ? 'info-error' : 'info-pass'}>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell>{info.error ? 'Error' : 'Pass'}</Table.Cell>
          </Table.Row>
        {
          ['error', 'type', 'width', 'height', 'size', 'duration'].map(key => {
            if (info[key]) {
              return (
                <Table.Row key={key}>
                  <Table.Cell>{key}</Table.Cell>
                  <Table.Cell>{info[key]}</Table.Cell>
                </Table.Row>
              );
            }
          })
        }
        </Table.Body>
      </Table>
    );
  }
}

render(
  <Demo />,
  document.getElementById('container')
);
