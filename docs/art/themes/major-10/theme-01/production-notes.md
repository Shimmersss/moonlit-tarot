# 命运之轮 · 基础原画分层制作记录

## 2026-09-18 · 输入与方案

- 实际查看 `front/public/tarot/major-10.webp`：1024×1536 原画，正面八辐主轮，四季章左上花、右上人面太阳、左下秋叶、右下雪林；下方完整 X 型石路连通前后岸。原画自带深色金边，基础卡需保留该构图及象征。
- 主体层：主轮、四季章以及连接在轮上的八个月相节点为一固定组；背景层：夜空、海面、月亮、岸和完整交叉石路；边框层：原画固定外框单独提取。少量游离星点可做效果层，不能让四季章跟随单独旋转。
- 当前首步：从原画像素提取主体与外框真 alpha，并生成清除轮/章/框的无重复背景。静态回退继续使用站点原件，不覆盖。

## 2026-09-18 · 分层与工程

- 采用内置 `image_gen` 对 `source/base-original.webp` 做清底编辑，输出原件 `~/.codex/generated_images/01a0b490-e687-7b23-81ff-a4b63908f536/exec-dda6ebec-49c7-4a3f-84d7-301a5c5bbb8d.png`，复制为 `assets/background.png`（1024×1536 RGB，SHA-256 `687bde7be3f68ae0e1165d37b78ab44c1ac0643b04acef77e867122a99229b34`）。实际请求：`Edit the provided original Wheel of Fortune tarot art into a clean OPAQUE background plate for same-canvas layered parallax. Preserve the original 1024x1536 vertical framing, original dusk indigo color palette, lower moonlit ocean, both shorelines, flowers, and the COMPLETE X-shaped stone paths exactly in composition. Remove the entire upper golden eight-spoke wheel, four round seasonal medallions, their orbit lines and stars attached to the wheel, and the thin dark/gold decorative card border. Reconstruct the covered sky with coherent painterly twilight clouds and stars; the upper sky must contain no wheel, medallion, gold circles or ghost imprints. Do not change the lower road layout, do not add people or objects, no text. Return one full-canvas opaque PNG.`
- `source/extract_original_layers.py` 从原画相同坐标提取八辐轮、四季章、八处月相节点及上方固定星饰；原画外框另存 `assets/text.png`。第一次外框宽度47px带入过宽原画天空，零视差合成出现明显直线接缝；改为38px固定边带后减轻。静态原图仍在原路径，副本为 `source/base-original.webp`，SHA-256 `45092421c62fb6e8c6e5bea9c7f8070cd54b3d8713917cee76e64675498fb8ce`。
- `derive_decorative_layers.py` 用最终主体做同坐标 Sobel 线稿、少量独立星点，输出 `layer-composite.png`。人工检查灰底主体与零视差合成，四章顺序、八辐及 X 石路保持；边框角饰在合成中有少量纹理差，后续如需更严格复原可单独返修框层。五层 `validate_assets.py` 通过，记录在 `asset-validation.json`。

- `run_pipeline.py` 使用 Blender 5.2.2 LTS 保存 `card.blend`、`renders/hero.png` 和真实卡体 `web/assets/card.glb`。`--skip-npm` 复用本仓库已安装的同版依赖；pipeline 的 `npx esbuild@0.25.0` 尝试远端获取而停滞，已终止该构建子进程，随后用本地 esbuild 手动打包 `web/app.bundle.js`。`app.js` 采用既有主题验证过的同步 `reset()` 实现；页面品牌及320px标题规则按月下样本设置。未改技能源文件。
- `verification/report.json` 与 `verification-320/report.json`：桌面/390px、320px 各 33/33 真实 WebGL 检查。人工查看零视差合成、Blender离线渲染、网页正面/左右倾斜及320px：轮、四章、外框和完整石路可辨。原外框与再生天空内缘有轻微纹理接缝，保留为局部美术返修项；五槽对照、四向极端倾斜、Android和上线仍未做。
