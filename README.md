# 月下塔罗 · Moonlit Tarot

[English](README.en.md)

一个纯前端的塔罗占卜与收藏小站：静心提问、洗牌、从 22 张大阿卡纳中亲手抽牌、逐张翻开，得到即时牌义并保存为报告；另有 110 款主题卡（22 牌 × 5 主题）可以抽取、收藏。

不需要后端、账号或 API Key：所有记录只保存在你自己的浏览器里，`npm run dev` 即可运行，也可以部署成任意静态站点。

![占卜牌阵](docs/images/reading-spread.jpg)

| 收藏库 | 主题详情 | 手机端 |
| --- | --- | --- |
| ![收藏库](docs/images/collection.jpg) | ![主题详情](docs/images/collection-detail.jpg) | ![手机端](docs/images/mobile.jpg) |

## 功能

- **月下占卜**：提问 → 选牌阵 → 洗牌 → 从扇形牌堆中抽牌 → 依次翻牌 → 即时解读。支持单张、圣三角与二择一牌阵，正位与逆位各有独立的关键词、牌义与建议。
- **主题共鸣**：每张抽到的牌会以五个主题之一显现（本源、潮汐、雪沙、秘园、星穹），同一牌阵中重复出现的系列会给出共鸣提示。
- **占卜报告**：把一次占卜整理成完整报告，包含整体意象、逐张解读、牌与牌之间的关系、二择一对照和行动建议，保存在占卜记录里。
- **月下抽卡与收藏库**：110 款主题卡等概率抽取，重复卡累计张数；收藏墙按 22 张牌分组，点开后切换五个主题，卡面带倾斜、厚度与箔光交互。
- **无障碍与响应式**：步骤切换时移动焦点，按钮与表单可键盘操作；桌面、390px 与 320px 宽度下都不会出现横向滚动。

## 快速开始

需要 Node.js 18.17 或更高版本。

```bash
npm install
```

```bash
npm run dev
```

打开终端里显示的地址（默认 <http://localhost:5173>）。

```bash
npm run build
```

`build` 会先运行测试，产物在 `dist/`，可部署到任何静态托管。本项目使用 History 路由，请把未知路径回退到 `index.html`；资源路径按站点根目录编写，部署在子路径下需要自行调整。

## 全息闪卡（可选）

仓库只包含运行占卜和收藏所需的封面与线稿（约 30MB）。110 款卡的完整分层素材与独立 3D 查看器约 760MB，放在 [GitHub Release](https://github.com/Shimmersss/moonlit-tarot/releases) 中：

```bash
npm run fetch:flashcards
```

脚本会下载压缩包、校验 SHA-256、解压到 `public/tarot/flashcards/`，并逐个校验其中的文件。完成后可以打开 `/tarot/flashcards/v20261009/major-18/theme-01/index.html` 这类地址，查看单张卡的 WebGL 全息效果。

## 目录结构

```text
src/
  api/localStore.js      浏览器内的数据层：牌阵、报告与收藏（localStorage）
  components/tarot/      占卜流程组件：提问、牌阵、洗牌、扇形牌堆、翻牌、即时解读
  components/card/       TarotHoloCard 倾斜箔光卡面与收藏卡片
  data/                  牌义目录 tarotReading.json、110 款主题 moonlitVariants.json
  utils/                 纯函数：解读组合、牌阵布局、主题解析（可在 Node 中测试）
  views/                 占卜、报告、抽卡、收藏库四个页面
public/tarot/            22 张基础牌面、主题封面与线稿
scripts/                 测试与闪卡下载脚本
docs/art/                美术制作规范、各主题 manifest 与生成提示词
```

## 接入你自己的后端

页面只通过 `src/api/localStore.js` 读写数据，函数都返回 `Promise<{ data }>`，失败时抛出带 `status` 的错误。想要账号同步、服务端洗牌或 AI 深度解读时，用同样的函数签名换成请求你自己的接口即可，页面代码无需改动。牌序、正逆位与主题在洗牌时就已确定，选牌只决定取哪一个位置，这一约定在服务端实现时也应保留。

## 美术资料

`docs/art/` 收录了这套牌的制作规范、21 张牌的逐牌制作单、母版与拆层提示词，以及 110 个主题槽位各自的 manifest 和制作记录（含实际调用、输入输出哈希与返修结论）。这些是制作过程的原始记录，其中引用的原图、分层工程和审查截图没有放进本仓库。详见 [docs/art/README.md](docs/art/README.md)。

## 许可

- 源代码：[MIT](LICENSE)
- 牌面、主题卡、线稿、闪卡素材与截图：[CC BY-NC-SA 4.0](LICENSE-ASSETS.md)（署名、非商业、相同方式共享）
- 第三方组件：[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)

牌面由 AI 图像模型生成后人工筛选与返修，未使用受版权保护的商业牌组图片。

## 免责声明

塔罗内容只提供象征性的观察视角，用于娱乐和整理思绪，不是预言、诊断或确定性结论，也不构成医疗、法律、心理或财务建议。
