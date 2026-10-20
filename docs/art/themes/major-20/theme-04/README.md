# major-20 theme-04 荒城破晓

主题场景：半透明天使吹号，五人及一犬在旧城广场迎向远处曙光，建筑安静完整

本目录是 v2.2 独立主题工程。真实 RGB 母版候选及调用、输入输出哈希均已保留；其后曾构建同画布图层、Blender/GLB、WebGL 与两份 33/33 自动报告，但当前状态为 `needs-rework`，不是本地验收完成。

2026-09-18 人工复核发现浏览器截图中天使和数名地面人物有明显绿色键色残边，离线 Blender 渲染也让前景局部过度透明。现有 `assets/subject.png`、`card.blend`、GLB、render 和验收截图均保留为拒收/返修证据；不得接入业务或发布。`card.blend1` 是 Blender 自动的前次保存备份，已保留用于恢复而非当前母版。返修须先重做可验证的前景 alpha，检查黑/白/灰背景后再重建并验收。

制作单：`docs/tarot-v2/cards/major-20.md`；提示词索引：`docs/tarot-v2/production-prompts.json`。
