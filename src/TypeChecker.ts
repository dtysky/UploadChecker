/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/11
 * Description:
 */

import {TFileTypes, TFile, CheckError} from './types';

export const checkType = (file: TFile, types: TFileTypes) => {
  return new Promise((resolve, reject) => {
    if (types.length === 0) {
      return resolve(file);
    }
    if (types.indexOf(file.type) >= 0) {
      return resolve(file);
    }
    return reject(new CheckError({
      name: 'type',
      currentValue: file.type,
      limitValue: types,
      file,
      message: `The type of file should be ${types.join(',')}，current is ${file.type}`
    }));
  });
}

export class TypeChecker {
  private types: TFileTypes;

  constructor(types: TFileTypes = []) {
    this.types = [];
  }

  public setTypes = (types: TFileTypes) => {
    this.types = types;
  }

  public check = (file: TFile) => {
    return checkType(file, this.types);
  }
}
