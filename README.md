# UploadChecker
Check type/size/resolution while uploading files in pure front-end way.

## Demo

[You can view the live demo here.]()

## Support browsers


## Installation


## Data structures

If using typescript, you can check the 'src/types.ts' to view and use those in your code in this way:

```ts
import {TFiles, IFileInfo} from 'upload-checker';
```

Following tables show all types and interfaces:

### Types

|Name|Value|Description|
|-|-|-|
|TFile|File||
|TFileType|string||
|TFileTypes|TFileType[]||
|TImageConstraintKey|'maxBytesPerPixel' \| 'maxSize' \| 'maxWidth'||
|TVideoConstraintKey|'maxBytesPerPixelPerSecond' \| 'maxSize' \| 'maxWidth' \| 'maxDuration'||
|TError| 'type' \| 'width' \| 'size' \| 'duration' \| 'bytes' \| 'unknown'||

### IFileInfo

|Name|required|type|Description|
|-|-|-|-|
|type|√|string||
|width|x|number||
|height|x|number||
|size|x|number||
|duration|x|number||

### ICheckError

|Name|required|type|Description|
|-|-|-|-|
|name|√|string||
|currentValue|√|number \| string[] \| string||
|limitValue|√|number \| string[] \| string||
|stack|√|string||
|message|√|string||

### ICheckResponse

|Name|required|type|Description|
|-|-|-|-|
|file|√|TFile||
|info|√|IFileInfo||
|error|x|ICheckError||

## API

Upload checker provides rich api for different requirements.

### checkType

### TypeChecker

### checkImage

### ImageChecker

### checkVideo

### videoChecker

### UploadChecker

## License

Copyright © 2017, 戴天宇, Tianyu Dai (dtysky < dtysky@outlook.com >). All Rights Reserved.
This project is free software and released under the **[MIT License](https://opensource.org/licenses/MIT)**.
