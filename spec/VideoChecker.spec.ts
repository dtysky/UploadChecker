/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/15
 * Description:
 */
/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/15
 * Description:
 */
import {checkVideo, VideoChecker} from '../src/VideoChecker';
import * as VC from '../src/VideoChecker';
import {spy} from 'sinon';
import {TFile} from '../src/types';

import {loadFile} from './utils';

describe('VideoChecker', () => {
  // describe('checkType', () => {
  //   let file;
  //   beforeEach(() => {
  //     file = <TFile>{type: 'image/png'};
  //   });
  //
  //   it('checkType, pass', done => {
  //     checkType(file, ['image/png', 'image/jpeg'])
  //       .then(res => {
  //         expect(res.error).toBeUndefined();
  //         expect(res.file).toEqual(file);
  //         expect(res.info).toEqual({type: 'image/png'});
  //         done();
  //       });
  //   });
  //
  //   it('checkType, empty types', done => {
  //     checkType(file, [])
  //       .then(res => {
  //         expect(res.error).toBeUndefined();
  //         expect(res.file).toEqual(file);
  //         expect(res.info).toEqual({type: 'image/png'});
  //         done();
  //       });
  //   });
  //
  //   it('checkType, error', done => {
  //     checkType(file, ['image/jpeg'])
  //       .catch(res => {
  //         expect(res.error).toEqual(jasmine.objectContaining({
  //           name: 'type',
  //           currentValue: 'image/png',
  //           limitValue: ['image/jpeg']
  //         }));
  //         expect(res.file).toEqual(file);
  //         expect(res.info).toEqual({type: 'image/png'});
  //         done();
  //       });
  //   });
  // });

  describe('VideoChecker', () => {
    let checker: VideoChecker;

    beforeEach(() => {
      checker = new VideoChecker(.5, 10, 1280 * 720);
    });

    it('Constructor', () => {
      expect(checker['maxBytesPerPixelPerSecond']).toEqual(.5);
      expect(checker['maxDuration']).toEqual(10);
      expect(checker['maxSize']).toEqual(1280 * 720);
      expect(checker['maxWidth']).toEqual(0);
    });

    it('setAttr', () => {
      checker.setAttr('maxSize', 100);
      expect(checker['maxSize']).toEqual(100);
    });

    it('check', done => {
      loadFile('video-pass.mp4', file => {
        (<any>VC).checkVideo = spy(checkVideo);
        checker.check(file)
          .then(() => {
            expect((<any>VC.checkVideo).calledWith(file, 10, .5, 1280 * 720, 0)).toBeTruthy();
            done();
          });
      });
    });
  });
});
