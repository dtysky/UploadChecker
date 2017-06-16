/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/15
 * Description:
 */
import {checkImage, ImageChecker} from '../src/ImageChecker';
import * as IC from '../src/ImageChecker';
import {spy} from 'sinon';

import {loadFile} from './utils';

const info = {
  type: 'image/png',
  width: 400,
  height: 400,
  size: 400 * 400
};

describe('ImageChecker', () => {
  describe('checkImage', () => {
    it('pass', done => {
      loadFile('img-pass.png', file => {
        checkImage(file, 0.5, 401 * 401, 401)
          .then(res => {
            expect(res.error).toBeUndefined();
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('zero width', done => {
      loadFile('img-pass.png', file => {
        checkImage(file, 0.5, 401 * 401, 0)
          .then(res => {
            expect(res.error).toBeUndefined();
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('zero size', done => {
      loadFile('img-pass.png', file => {
        checkImage(file, 0.5, 0, 401)
          .then(res => {
            expect(res.error).toBeUndefined();
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('zero pixel size', done => {
      loadFile('img-pass.png', file => {
        checkImage(file, 0, 401 * 401, 401)
          .then(res => {
            expect(res.error).toBeUndefined();
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('error with width', done => {
      loadFile('img-pass.png', file => {
        checkImage(file, 0, 401 * 401, 200)
          .catch(res => {
            expect(res.error).toEqual(jasmine.objectContaining({
              name: 'width',
              currentValue: 400,
              limitValue: 200
            }));
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('error with size', done => {
      loadFile('img-pass.png', file => {
        checkImage(file, 0, 200 * 400, 401)
          .catch(res => {
            expect(res.error).toEqual(jasmine.objectContaining({
              name: 'size',
              currentValue: 400 * 400,
              limitValue: 200 * 400
            }));
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('error with bytes', done => {
      loadFile('img-pass.png', file => {
        checkImage(file, .01, 401 * 401, 401)
          .catch(res => {
            expect(res.error).toEqual(jasmine.objectContaining({
              name: 'bytes',
              currentValue: 7736,
              limitValue: 2048
            }));
            expect(res.info).toEqual(info);
            done();
          });
      });
    });

    it('unknown error', done => {
      loadFile('img-error.png', file => {
        checkImage(file, 1, 401 * 401, 401)
          .catch(res => {
            expect(res.error).toEqual(jasmine.objectContaining({
              name: 'unknown',
              currentValue: 'unknown',
              limitValue: 'image'
            }));
            expect(res.info).toEqual({type: 'unknown'});
            done();
          });
      });
    });
  });

  describe('ImageChecker', () => {
    let checker: ImageChecker;

    beforeEach(() => {
      checker = new ImageChecker(.5, 1280 * 720);
    });

    it('Constructor', () => {
      expect(checker['maxBytesPerPixel']).toEqual(.5);
      expect(checker['maxSize']).toEqual(1280 * 720);
      expect(checker['maxWidth']).toEqual(0);
    });

    it('setAttr', () => {
      checker.setAttr('maxSize', 100);
      expect(checker['maxSize']).toEqual(100);
    });

    it('check', done => {
      loadFile('img-pass.png', file => {
        (<any>IC).checkImage = spy(checkImage);
        checker.check(file)
          .then(() => {
            expect((<any>IC.checkImage).calledWith(file, .5, 1280 * 720, 0)).toBeTruthy();
            done();
          });
      });
    });
  });
});
