# major-10 theme-02 潮汐轮盘

主题场景：一枚八辐圆轮悬于潮池上，四季圆章按既定四角位置分布，交叉石路没入浅水

本目录是 v2.2 独立主题工程。已用真实 RGB 母版 `source/master-v01.png` 制成同画布 RGBA 主体、清底背景、同源线稿、水光与固定框，并构建可编辑 `card.blend`、真实卡体 GLB、离线渲染及 Three.js 网页。桌面/390px 与 320px 的真实 WebGL 检查各 33/33；人工查看正面、左右倾斜与 320px 截图。状态为 `local-holo-verified-awaiting-user-review`，未接入业务或部署。

本轮逐步制作记录见 [production-notes.md](production-notes.md)。

本地预览：在本目录运行 `node web/server.mjs`，打开其输出地址。Blender 材质节点在网页中由 GLSL 重建，两端不会逐像素一致。五槽位对照、专门四向极端倾斜审查和 Android 尚未完成。

制作单：`docs/tarot-v2/cards/major-10.md`；提示词索引：`docs/tarot-v2/production-prompts.json`。
