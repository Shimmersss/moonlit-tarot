# major-10 命运之轮 基础分层

本目录对应 v2.2 基础原画分层槽位（theme-01）。站点原画保持不变，已从原像素提取主轮、四季章和固定外框，完成清底背景、真实透明层、Blender/GLB 与 Three.js 本地工程。桌面/390px 和 320px 真实 WebGL 检查各 33/33，状态 `local-holo-verified-awaiting-user-review`，未接入业务或发布。

逐步制作记录见 [production-notes.md](production-notes.md)；本地预览在本目录运行 `node web/server.mjs`。外框与再生天空内缘有轻微纹理接缝，后续可局部修框。Blender 节点在网页中由 GLSL 重建，两端不逐像素一致。

制作单：`docs/tarot-v2/cards/major-10.md`；总提示词：`docs/tarot-v2/production-prompts.json`。
