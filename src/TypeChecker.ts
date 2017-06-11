/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/11
 * Description:
 */

import {TFileTypes, TFile} from './types';

export const checkType = (file, types: TFileTypes) => {
  return types.indexOf(file.type) >= 0;
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
