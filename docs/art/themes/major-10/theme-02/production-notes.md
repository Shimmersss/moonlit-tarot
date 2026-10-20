# 潮汐轮盘 · 制作记录

## 2026-09-18 · 续作起点

- 输入母版：`source/master-v01.png`，1024×1536 RGB，SHA-256 `0e05d2762fedfcb7f82e1fc15051a52ca8e7c485aa390538b05e59072ecde281`。实际目视检查：八辐正面主轮、左上花、右上日、左下叶、右下雪林可见；下方 X 形石路完整。四圆章与主轮的连接仍需在拆层后核对。
- 本轮目标：保留该母版原像素作为主体，制作真 RGBA 的主轮与四圆章；清除背景中的重复轮/圆章，保留潮池、月亮、海岸和完整石路；随后制作固定框与同源线稿，再运行 Blender/Three.js 工程。
- 2026-09-18 首次背景清底图像生成请求失败：工具返回 `connection failed: error sending request`，没有收到产物，未写入源文件。请求为编辑本母版，移除整个金色主轮、四个圆章、轨道与装饰，保留下半部海/月亮/X 石路，并以连续深靛夜空补全。后续重试会另存候选，不覆盖母版。

## 2026-09-18 · 分层制作

- 第二次背景编辑在用户续作消息打断时未返回可用结果；不计入产物。第三次编辑成功返回图像，但该轮未输出可见文字；采用第四次、已实际查看的清底候选。调用：内置 `image_gen`，输出 ID `exec-9648c1f1-5184-4d95-9306-d4b093adcc6b`，输入 `source/master-v01.png`。完整请求：`Remove the giant golden wheel and four seasonal medallions from this tarot image to make a coherent dark blue night sky background plate. Keep the sea, moonlit shore and X stone roads. Output image only.` 生成原件在 `~/.codex/generated_images/01a0b490-e687-7b23-81ff-a4b63908f536/exec-9648c1f1-5184-4d95-9306-d4b093adcc6b.png`，复制为 `assets/background.png`；1024×1536 RGB，SHA-256 `3589a9e9939fb88a703d8fef345ea1314a0e4bfbbd457ffc2b9257ee3964116f`。目视未见轮/圆章残影，完整 X 石路、潮池、月亮和海岸仍在。
- `source/extract_subject.py` 从母版原像素提取主轮、四圆章、八处小月相节点；几何选区与金色分类只制作遮罩，不重新绘制牌面。`assets/subject.png` 为真 RGBA；修正首版中心轮毂误透明后，透明像素约 74.4%、半透明约 3.8%、不透明约 21.8%。黑/白/灰底检查图位于 `source/subject-on-*.png`。圆章顺序及八辐保持固定，未旋转图层。
- `derive_decorative_layers.py` 从最终主体像素 Sobel 边缘派生 `assets/lineart.png`，绘制少量独立水光 `assets/effects.png` 和波纹金属固定框 `assets/text.png`，并输出 `layer-composite.png`。零视差合成已目视检查：无第二个轮或断开的石路；小水光是脚本绘制的装饰，未声称来自母版或具有独立骨骼动画。

## 待续步骤

1. 补命运之轮基础分层与其余三个新主题，完成五槽并排对照。
2. 对本主题补专门四向极端倾斜审查；Android 与正式站点接入另行处理。

## 2026-09-18 · 工程与网页

- 五层资产经 RuiC `validate_assets.py` 检查通过，报告为 `asset-validation.json`。首次检查因水光图层实心像素不足而失败；在 `derive_decorative_layers.py` 中增加少量水光后重跑通过，未削弱校验门槛。
- `run_pipeline.py` 使用本机 Blender 5.2.2 LTS 建成 `card.blend`、`renders/hero.png` 与 `web/assets/card.glb`。npm 远端安装 `three@0.180.0` 遇 `ECONNRESET`，离线缓存也无该包；从本仓库既有同版本主题网页复制已安装的 `node_modules`，使用其中的 esbuild 重建 `web/app.bundle.js`。网页 `app.js` 采用既有主题已验证的同步归位 `reset()` 修复；页面品牌与 320px 标题布局按月下会客厅样本调整。构建后清理了可重建的本主题 `web/node_modules`；网页使用已打包的 `app.bundle.js` 运行。未改技能源文件。
- `verification/report.json`：桌面/390px 真实 WebGL 33/33。`verification-320/report.json`：以技能验证脚本的 320px 视口副本运行，真实 WebGL 33/33。检查涵盖拖动、翻面、缩放、键盘、全部景深与箔光滑杆、四种材质、下载、无失败资源和 reduced-motion。
- 人工查看 `layer-composite.png`、`renders/hero.png`、桌面正面、左右倾斜和 320px 截图；八辐轮、四季章及 X 石路可辨，未见重复轮或明显透明边缘问题。用户审美确认、五槽比较与专门四向极端倾斜仍未做；Android 与上线未做。
