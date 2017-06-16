/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 2017/6/16
 * Description:
 */
import {TFile} from '../src/types';

export const loadFile = (fp: string, callback: (file: TFile) => void) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/base/test-files/${fp}`);
  xhr.responseType = 'blob';
  xhr.onload = () => {
    callback(xhr.response);
  };
  xhr.send();
};
