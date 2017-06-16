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

const info = {
  type: 'video/mp4',
  width: 404,
  height: 720,
  size: 404 * 720,
  duration: 9.96
};

describe('VideoChecker', () => {
  describe('checkVideo', () => {
    it('pass', done => {
      loadFile('video-pass.mp4', file => {
        checkVideo(file, 0.5, 10, 405 * 721, 405)
          .then(res => {
            expect(res.error).toBeUndefined();
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('zero width', done => {
      loadFile('video-pass.mp4', file => {
        checkVideo(file, 0.5, 10, 405 * 721, 0)
          .then(res => {
            expect(res.error).toBeUndefined();
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('zero size', done => {
      loadFile('video-pass.mp4', file => {
        checkVideo(file, 0.5, 10, 0, 405)
          .then(res => {
            expect(res.error).toBeUndefined();
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('zero pixel size', done => {
      loadFile('video-pass.mp4', file => {
        checkVideo(file, 0, 10, 405 * 721, 405)
          .then(res => {
            expect(res.error).toBeUndefined();
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('zero duration', done => {
      loadFile('video-pass.mp4', file => {
        checkVideo(file, 0.5, 0, 405 * 721, 405)
          .then(res => {
            expect(res.error).toBeUndefined();
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('error with width', done => {
      loadFile('video-pass.mp4', file => {
        checkVideo(file, 0.5, 10, 405 * 721, 200)
          .catch(res => {
            expect(res.error).toEqual(jasmine.objectContaining({
              name: 'width',
              currentValue: 404,
              limitValue: 200
            }));
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('error with size', done => {
      loadFile('video-pass.mp4', file => {
        checkVideo(file, 0.5, 10, 200 * 721, 405)
          .catch(res => {
            expect(res.error).toEqual(jasmine.objectContaining({
              name: 'size',
              currentValue: 404 * 720,
              limitValue: 200 * 721
            }));
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('error with bytes', done => {
      loadFile('video-pass.mp4', file => {
        checkVideo(file, 0.01, 10, 405 * 721, 405)
          .catch(res => {
            expect(res.error).toEqual(jasmine.objectContaining({
              name: 'bytes',
              currentValue: 353909,
              limitValue: 29696
            }));
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('error with duration', done => {
      loadFile('video-pass.mp4', file => {
        checkVideo(file, 1, 5, 405 * 721, 405)
          .catch(res => {
            expect(res.error).toEqual(jasmine.objectContaining({
              name: 'duration',
              currentValue: 9.96,
              limitValue: 5
            }));
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('unknown error', done => {
      loadFile('img-error.png', file => {
        checkVideo(file, 1, 10, 405 * 721, 405)
          .catch(res => {
            expect(res.error).toEqual(jasmine.objectContaining({
              name: 'unknown',
              currentValue: 'unknown',
              limitValue: 'video'
            }));
            expect(res.info).toEqual({type: 'unknown'});
            done();
          });
      });
    });
  });

  describe('VideoChecker', () => {
    let checker: VideoChecker;

    beforeEach(() => {
      checker = new VideoChecker(.5, 10, 1280 * 720, 1000);
    });

    it('Constructor', () => {
      expect(checker['maxBytesPerPixelPerSecond']).toEqual(.5);
      expect(checker['maxDuration']).toEqual(10);
      expect(checker['maxSize']).toEqual(1280 * 720);
      expect(checker['maxWidth']).toEqual(1000);
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
            expect((<any>VC.checkVideo).called).toBeTruthy();
            done();
          });
      });
    });
  });
});
