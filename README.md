# UploadChecker
Check and constrain type/size/resolution while uploading files in pure front-end way.

[![Test status](https://travis-ci.org/dtysky/UploadChecker.svg?branch=master)](https://travis-ci.org/dtysky/UploadChecker)

## Demo

[You can view the live demo here.](http://upload-checker.dtysky.moe)

## Browsers Supporting

Upload checker support all browsers that support `Blob URLs`, you can check them here：

http://caniuse.com/#feat=bloburls

## Installation

```bash
npm install upload-checker
```

## Data structures

If using typescript, you can check the 'src/types.ts' to view and use those in your code in this way:

```ts
import {TFiles, IFileInfo} from 'upload-checker';
```

Following tables show all types and interfaces:

### Types

|Name|Value|Description|
|-|-|-|
|TFile|File|A HTML file element.|
|TFileType|string|Type of file, like 'image/png'.|
|TFileTypes|TFileType[]|Array of TFile.|
|TImageConstraintKey|'maxBytesPerPixel' \| 'maxSize' \| 'maxWidth'|All constraints for image files.|
|TVideoConstraintKey|'maxBytesPerPixelPerSecond' \| 'maxSize' \| 'maxWidth' \| 'maxDuration'|All constraints for video files.|
|TError| 'type' \| 'width' \| 'size' \| 'duration' \| 'bytes' \| 'unknown'|Error types.|

### IFileInfo

|Name|Required|Type|Description|
|-|:-:|-|-|
|Type|√|TFileType|Type of file.|
|width|x|number|Width of image or video.|
|height|x|number|Height of image or video.|
|size|x|number|Size (width x height) of image or video.|
|duration|x|number|Duration of video.|

### ICheckError

|Name|Required|Type|Description|
|-|:-:|-|-|
|name|√|TError|Type of error.|
|currentValue|√|number \| string[] \| string|Current value of wrong constraint.|
|limitValue|√|number \| string[] \| string|Max value of wrong constraint.|
|stack|√|string|Error stack.|
|message|√|string|Error message.|

### ICheckResponse

|Name|Required|Type|Description|
|-|:-:|-|-|
|file|√|TFile|Current file.|
|info|√|IFileInfo|Info of file.|
|error|x|ICheckError|Error of checking if something wrong.|

## API

Upload checker provides rich api for different requirements. You can import theme in two ways:

```ts
import {checkType} from 'upload-checker';
```

or

```ts
import {checkType} from 'upload-checker/src/TypeChecker';
```

In the second way, only module `TypeChecker` will be packed to your source file.

### checkType

(file: TFile,types: TFileTypes) => Promise<ICheckResponse>

In module `upload-checker/TypeChecker`.

```ts
checkType(file, types)
.then(res => {......})
.catch(res => {......});
```

### TypeChecker

An class for storing types' constraints then could be reused with `check` method.

In module `upload-checker/TypeChecker`.

|Method|Type|Description|
|-|-|-|
|constructor|(types: TFileTypes = []) => void|Constructor function, if types is empty, all file types will be allowed.|
|setTypes|(types: TFileTypes) => void|Set types of checker.|
|check|(file: TFile) => Promise<ICheckResponse>|Check file with current types.|

```ts
const checker = new TypeChecker(['image/png']);
checker.setTypes(['image/jpeg']);
checker.check(file)
.then(res => {......})
.catch(res => {......});
```

### checkImage

(file: TFile, maxBytesPerPixel: number, maxSize: number, maxWidth?: number) => Promise<ICheckResponse>

In module `upload-checker/ImageChecker`.

```ts
checkImage(file, maxBytesPerPixel, maxSize, maxWidth)
.then(res => {......})
.catch(res => {......});
```

### ImageChecker

An class for storing image's constraints then could be reused with `check` method.

In module `upload-checker/ImageChecker`.

|Method|Type|Description|
|-|-|-|
|constructor|(maxBytesPerPixel: number, maxSize: number, maxWidth?: number) => void|Constructor function, if max[attr] is 0, checker will not check that.|
|setAttr|(key: TImageConstraintKey, value: number) => void|Set attr of checker.|
|check|(file: TFile) => Promise<ICheckResponse>|Check file with current constraint.|

```ts
const checker = new ImageChecker(.5, 1280 * 720);
checker.setAttr('maxWidth', 1280);
checker.check(file)
.then(res => {......})
.catch(res => {......});
```

### checkVideo

(file: TFile, maxBytesPerPixelPerSecond: number, maxDuration: number, maxSize: number, maxWidth?: number) => Promise<ICheckResponse>

In module `upload-checker/VideoChecker`.

```ts
checkVideo(file, maxBytesPerPixelPerSecond, maxDuration, maxSize, maxWidth)
.then(res => {......})
.catch(res => {......});
```

### VideoChecker

An class for storing video's constraints then could be reused with `check` method.

In module `upload-checker/VideoChecker`.

|Method|Type|Description|
|-|-|-|
|constructor|(maxBytesPerPixelPerSecond: number, maxDuration: number, maxSize: number, maxWidth?: number) => void|Constructor function, if max[attr] is 0, checker will not check that.|
|setTypes|(types: TFileTypes) => void|Set attr of checker.|
|check|(file: TFile) => Promise<ICheckResponse>|Check file with current constraint.|

```ts
const checker = new VideoChecker(.5, 10, 1280 * 720);
checker.setAttr('maxWidth', 1280);
checker.check(file)
.then(res => {......})
.catch(res => {......});
```

### UploadChecker

A react component for better usage.

#### Props

|Name|Type|Description|
|-|-|-|
|Types|IFileTypes|Same as parameters of constructor of TypeChecker.|
|multiple|boolean|Could user select multiple files.|
|onDrop|(res: ICheckResponse) => void|A callback will be called after file is checked.|
|imageConstraint|Same as parameters of constructor of ImageChecker.|Constraints for image files.|
|videoConstraint|Same as parameters of constructor of VideoChecker.|Constraints for video files.|
|children|JSX.Element \| string|Children element.|
|className|string|ClassName for root element.|
|style|any|Style for root element.|

All others props will be passed to `input`.

## Contribute

### Development

Run:

```bash
npm run dev
```

then open `localhost:4444`.

### Unit test

Run:

```bash
npm run unittest
```

then find reports in the `report` folder.

### Build

Run:

```bash
npm run build
```

## License

Copyright © 2017, 戴天宇, Tianyu Dai (dtysky < dtysky@outlook.com >). All Rights Reserved.
This project is free software and released under the **[MIT License](https://opensource.org/licenses/MIT)**.
