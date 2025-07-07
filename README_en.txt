## 1 Copyright

The project code (except for those mentioned in #2) was written by SeaBee (an external programmer) in 2025

  - Can be contacted via https://github.com/triplepiers

The project code may be freely used by the ResumeEdge project team.

## 2 Credits

- The following code is adapted from the open-source project [shadcn](https://ui.shadcn.com/).

  - Files: `frontEnd/components/ui/*.tsx` (Except `SummaryHead.tsx`)

  - This project has modified the styling and partially reimplemented some features based on it.

  - Source credits are included in the file header.

- The project incorporates the following open-source code segments to guarantee proper compilation:

  Source credits are included in the file header

  1. From the open-source project [JSFrontPicker](https://www.jsfontpicker.com)

      Files: `frontEnd/lib/fontpicker.min.js` & `frontEnd/fontpicker.d.ts`
    
  2. From the open-source project [pdfjs-dist](https://github.com/mozilla/pdfjs-dist)

      Files: `frontEnd/public/pdf-dist/*`

## 3 Usage

### 3.1 Set Up

#### Environment

Both front-end and back-end projects are built based on NodeJS

- You can confirm the installation with the following command (recommended version ≥ 23.9.0):
  
  ```
  node --version
  ```

- If not yet installed, proceed with the following:

  - Windows: Refer to https://nodejs.org/en/download

  - MacOS: 

    If you haven't installed Homebrew yet, refer to https://brew.sh/

    Then, run the following command:
      
      ```
      brew install node
      ```

#### LLM API Key

- Some features of this project are implemented based on LLM (e.g., Chat-GPT, DeepSeek).
  Please configure an API-KEY to ensure proper operation.

- Create file `.env` in the `backEnd` directory with the following content:

  ```
  MODEL_URL=''             # e.g., https://api.deepseek.com
  MODEL_KEY='sk-******'    # Your API-KEY
  MODEL_NAME=''            # e.g., deepseek-chat
  ```

#### Dependencies

1. Back-end: run the following commands

  ```
  cd path/to/backEnd
  npm install
  ```

2. Front-end: run the following commands

  ```
  cd path/to/frontEnd
  npm install
  ```

  Besides, you should manually modify some code

  ```
  /*
   * File: frontEnd/node_modules/dom-to-image/src/dom-to-image.js
   * Function: newCanvas() => OverWrite it
   */
  function newCanvas(domNode) {
    var canvas = document.createElement('canvas');

    var ctx = canvas.getContext('2d');
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    var scale = options.scale || 4; // 默认值 4
    canvas.width = (options.width * scale) || util.width(domNode)*scale;
    canvas.height = (options.height * scale) || util.height(domNode)*scale;
    ctx.scale(scale, scale) // 添加了scale参数

    if (options.bgcolor) {
        ctx.fillStyle = options.bgcolor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return canvas;
  }
  ```

### 3.2 Run (in DEV mode)

This is a frontend-backend separated project. You need to open two terminals to run the frontend and backend separately.

1. Back-end: at port 8080

  ```
  cd path/to/backEnd
  npm run dev
  ```

2. Front-end: at port 3000

  ```
  cd path/to/frontEnd
  npm run dev
  ```

### 3.3 Update Job Information

- The project includes Job Info collected on 2025/07/06 by default (located in the path `backEnd/data`).

- To update, please manually run the following commands:

  ```
  cd backEnd && npm run update
  ```
