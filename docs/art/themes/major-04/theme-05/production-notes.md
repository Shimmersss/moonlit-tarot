# 轨道城邦 · 母版生图记录

## 2026-09-19

- 输入身份/画风参考：`front/public/tarot/major-04.webp`，已实际查看，SHA-256 `4cadeeefe7a3f4dc9ac54b92f832d7fdc8709b8c60459e2e868e8ed49f2b5f60`。
- 工具：内置 `image_gen`。本次调用失败：`HTTP 429 usage_limit_reached; resets_at 2026-09-19 01:51:55 Asia/Shanghai`；没有生成文件，目录保持 `planned`，未选择母版。
- 完整实际提示词：`Create ONE original opaque full-frame 1024x1536 vertical Emperor tarot master, theme 轨道城邦 / Orbital City-State. Reference card supplies Emperor identity: one mature bearded crowned ruler in deep indigo-plum robes, seated with one scepter; keep one compass and exactly FOUR distinct stone geometric solids, cube, pyramid, sphere and truncated pyramid. New science-fantasy setting inside an orbital city's observation hall: solid throne RIGHT of center, broad curved viewport on LEFT revealing a luminous arc-shaped city above a planet. Palette midnight blue, titanium silver, restrained amber, natural skin. A physically solid throne dais, floor and compass pedestal join to form complete lower support reaching bottom bleed. The four heavy stones sit separately on a front ledge with clear contact shadows, no hovering furniture. Sophisticated hand-painted tarot art, delicate narrow celestial gold border, polished metal and atmospheric space. One emperor, no other people, one compass, four countable solids, no duplicate props, no lettering, title, numbers, watermark or logo. One opaque complete master.`
- 待额度恢复后重试；不得用原画复制件或空白文件替代生图。

## 2026-09-21 · 成功重试

- 工具：内置 `image_gen`。原始生成文件：`~/.codex/generated_images/01a0c1e3-6ec7-7be2-b136-eafc35dd3e3d/exec-8c2c6937-f0ac-44bb-bad2-05095ba97bc9.png`；保留原件，复制到 `source/master-v01.png`。
- 输入 SHA-256：`4cadeeefe7a3f4dc9ac54b92f832d7fdc8709b8c60459e2e868e8ed49f2b5f60`。输出 SHA-256：`dba0876f279495499032901ef74304f6867932792e85cc10c2ae4a14322d1df8`；1024×1536，RGB，3187879 bytes。
- 完整实际提示词：

```text
Use case: stylized-concept
Asset type: opaque full-frame tarot card master for later holographic card production
Primary request: Create ONE original opaque full-frame 1024x1536 vertical Emperor tarot master, theme 轨道城邦 / Orbital City-State.
Input images: Image 1 is an identity and painterly tarot-style reference only; create a new composition.
Subject: exactly one mature dark-haired BEARDED crowned emperor in deep indigo-plum robes, seated on a physically solid throne RIGHT of center and holding exactly one upright scepter. Include exactly ONE grounded physical compass and exactly FOUR separate heavy stone geometric solids: one cube, one pyramid, one sphere, one truncated pyramid.
Scene/backdrop: science-fantasy observation hall inside an orbital city; a broad curved viewport on the LEFT reveals a luminous arc-shaped city above a planet.
Composition/framing: throne right of center, viewport and orbital city arc left. A solid throne dais, floor, and compass pedestal connect as one complete lower support reaching bottom bleed. Four stones sit separately on a front ledge with clear contact shadows, fully visible and countable. Delicate narrow celestial gold border.
Style/medium: sophisticated hand-painted fantasy tarot illustration with polished titanium architecture and atmospheric space, opaque RGB full scene.
Lighting/mood: calm sovereign authority, deep-space grandeur, physically believable structural lighting.
Color palette: midnight blue, titanium silver, restrained amber, deep indigo-plum robes, natural skin.
Constraints: exactly one emperor, one scepter, one compass, four stones only; compass must remain a grounded navigational instrument, not a floating luminous disc or fifth stone; no hovering furniture; continuous floor and base.
Avoid: extra people, duplicate emperor, duplicate compass, duplicate scepter, extra solids, floating objects, cropped base, text, lettering, title, numbers, watermark, logo.
```

- 首轮粗看：皇帝与王座位于右侧，左侧舷窗内轨道城弧线明确，单一罗盘与前景四个独立石体可辨，地板和台基连续到底。只选定不透明母版；未拆层、未组装、未做统一复核或用户审美确认。
