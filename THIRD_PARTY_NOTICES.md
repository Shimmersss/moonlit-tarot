# Third-Party Notices / 第三方组件

本文件是归属说明，不替代各组件自身的许可证全文。
This file is an attribution summary and does not replace each component's full license text.

## 随仓库或 Release 分发 / Shipped in this repository or its Release

| 组件 Component | 位置 Location | 版本 Version | 许可 License |
| --- | --- | --- | --- |
| [Noto Serif SC](https://fonts.google.com/noto/specimen/Noto+Serif+SC)（子集 / subset） | `src/assets/fonts/` | — | SIL OFL 1.1，全文见 / full text in `src/assets/fonts/NotoSerifSC-LICENSE.txt` |
| RuiC Card Skill 全息闪卡查看器 / holographic card viewer, © 2026 HRuiCcc | Release 闪卡包中的 `app.js` 源码（已打包进 `app.bundle.js`）/ viewer source bundled into `app.bundle.js` in the Release pack | — | MIT（见下方全文 / full text below） |
| [three.js](https://threejs.org/)（含 GLTFLoader） | 同上，打包进 `app.bundle.js` / bundled into `app.bundle.js` | r180 | MIT |

Release 中的 `app.bundle.js` 未压缩，内含查看器与 three.js 的完整可读源码，模块边界以 `// node_modules/...`、`// viewer/...` 注释标出。
The `app.bundle.js` files in the Release are unminified and contain the full readable source of the viewer and three.js, with module boundaries marked by `// node_modules/...` and `// viewer/...` comments.

### RuiC Card Skill — MIT License

```
MIT License

Copyright (c) 2026 HRuiCcc

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

### three.js — MIT License

```
The MIT License

Copyright © 2010-2025 three.js authors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## npm 依赖 / npm dependencies

| 组件 Component | 版本 Version | 许可 License |
| --- | --- | --- |
| [Vue](https://vuejs.org/) | 3.5 | MIT |
| [Vue Router](https://router.vuejs.org/) | 4.6 | MIT |
| [Naive UI](https://www.naiveui.com/) | 2.44 | MIT |
| [Vite](https://vitejs.dev/) · `@vitejs/plugin-vue` | 5.4 · 5.2 | MIT |
| [Sass](https://sass-lang.com/) | 1.98 | MIT |

确切版本以 `package-lock.json` 为准 / exact versions follow `package-lock.json`.
