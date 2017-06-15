/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/15
 * Description:
 */
import {checkType, TypeChecker} from '../src/TypeChecker';
import * as TC from '../src/TypeChecker';
import {spy} from 'sinon';
import {TFile} from '../src/types';

describe('TypeChecker', () => {
  describe('checkType', () => {
    let file;
    beforeEach(() => {
      file = <TFile>{type: 'image/png'};
    });

    it('checkType, pass', done => {
      checkType(file, ['image/png', 'image/jpeg'])
        .then(res => {
          expect(res.error).toBeUndefined();
          expect(res.file).toEqual(file);
          expect(res.info).toEqual({type: 'image/png'});
          done();
        });
    });

    it('checkType, empty types', done => {
      checkType(file, [])
        .then(res => {
          expect(res.error).toBeUndefined();
          expect(res.file).toEqual(file);
          expect(res.info).toEqual({type: 'image/png'});
          done();
        });
    });

    it('checkType, error', done => {
      checkType(file, ['image/jpeg'])
        .catch(res => {
          expect(res.error).toEqual(jasmine.objectContaining({
            name: 'type',
            currentValue: 'image/png',
            limitValue: ['image/jpeg']
          }));
          expect(res.file).toEqual(file);
          expect(res.info).toEqual({type: 'image/png'});
          done();
        });
    });
  });

  describe('TypeChecker', () => {
    let file;
    let checker: TypeChecker;

    beforeEach(() => {
      checker = new TypeChecker(['image/png']);
      file = <TFile>{type: 'image/png'};
    });

    it('Constructor', () => {
      expect(checker['types']).toEqual(['image/png']);
    });

    it('setAttr', () => {
      checker.setTypes(['image/jpeg']);
      expect(checker['types']).toEqual(['image/jpeg']);
    });

    it('check', done => {
      (<any>TC).checkType = spy(checkType);
      checker.check(file)
        .then(() => {
          expect((<any>TC.checkType).calledWith(file, ['image/png'])).toBeTruthy();
          done();
        });
    });
  });
});

