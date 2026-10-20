# 月亮 01 · 2026-09-16 返修版

本地工程，未部署。原始候选与返修前资产保留在 source/ 和 history/。

- `card.blend`：可编辑、打包贴图；`renders/hero.png` 为新渲染。
- `assets/` 与 `web/assets/`：同画布透明层，网页使用卡体几何和GLSL视差。
- `generation-prompts.json`：本轮完整实际提示词；历史缺失明确标记，不能逆向伪造。
- `../repair_mattes_v2.py`：当前alpha与同源线稿处理；`../rebuild_repaired.py`：重建四套Blender、GLB并同步网页素材，保留网页定制。
- `verification-repair/` 与 `verification-repair-320/`：本轮检查与截图。

启动：`PORT=4191 node web/server.mjs`（在当前工程目录运行）。

修复：以重新生成的完整承重前景代替孤立动物与窄岩条。主体与连接结构共用同一层，背景及轻前景提供视差，未把每只灵兽建成完整立体模型。

Blender节点在浏览器重建为GLSL，两端接近而非逐像素一致。历史生图记录缺失是遗留溯源限制；本轮过程已记录。Android与生产集成未验收。
