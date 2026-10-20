# 沙城基石 · 母版生图记录

## 2026-09-19

- 输入身份/画风参考：`front/public/tarot/major-04.webp`，已实际查看，SHA-256 `4cadeeefe7a3f4dc9ac54b92f832d7fdc8709b8c60459e2e868e8ed49f2b5f60`。
- 工具：内置 `image_gen`。本次调用失败：`HTTP 429 usage_limit_reached; resets_at 2026-09-19 01:51:55 Asia/Shanghai`；没有生成文件，目录保持 `planned`，未选择母版。
- 完整实际提示词：`Create ONE original opaque full-frame 1024x1536 vertical Emperor tarot master, theme 沙城基石 / Sand-City Foundation. Use original only to preserve identity: one mature dark-haired BEARDED crowned emperor, dark royal cloak, upright scepter, a single compass, exactly FOUR distinct geometric stone solids (cube, pyramid, sphere, truncated pyramid). New desert scene: emperor sits frontally on a sturdy sandstone throne above broad steps; the four solids alternate front-to-back along the foreground base with clear contact shadows and a compass alongside. A turquoise oasis and clearly geometric horizontal city walls lie in distance. Palette red sandstone, blue-green oasis, worn gold, natural skin. Throne, steps, compass base and stone solids all rest on one continuous substantial sandstone foundation reaching the bottom bleed. Painterly fantasy tarot with fine narrow engraved gold border, strong near/mid/far perspective, no floating props. Exactly one emperor, four solids, one scepter and one compass. No lettering, title, numbers, logo or watermark.`
- 待额度恢复后重试；不得用原画复制件或空白文件替代生图。

## 2026-09-21 · 成功重试

- 工具：内置 `image_gen`。原始生成文件：`~/.codex/generated_images/01a0c1e3-6ec7-7be2-b136-eafc35dd3e3d/exec-fb48d0fa-e122-4a11-9d20-e14825c29be8.png`；保留原件，复制到 `source/master-v01.png`。
- 输入 SHA-256：`4cadeeefe7a3f4dc9ac54b92f832d7fdc8709b8c60459e2e868e8ed49f2b5f60`。输出 SHA-256：`52b399f2aa3b2a362854db5a9982fa9cb3970f4a0f5f0eaba6b3675d79358174`；1024×1536，RGB，3315905 bytes。
- 完整实际提示词：

```text
Use case: stylized-concept
Asset type: opaque full-frame tarot card master for later holographic card production
Primary request: Create ONE original opaque full-frame 1024x1536 vertical Emperor tarot master, theme 沙城基石 / Sand-City Foundation.
Input images: Image 1 is an identity and painterly tarot-style reference only; create a new composition.
Subject: exactly one mature dark-haired BEARDED crowned emperor in dark indigo-plum royal robes, seated frontally on a sturdy sandstone throne and holding exactly one upright scepter. Include exactly ONE grounded physical compass and exactly FOUR separate geometric stone solids: one cube, one pyramid, one sphere, one truncated pyramid.
Scene/backdrop: broad sandstone steps and a continuous substantial red-sandstone foundation; a turquoise oasis and clearly geometric horizontal city walls in the distance.
Composition/framing: frontal wide throne and steps; four solids arranged with deliberate front-to-back staggering along the foreground base, all fully visible, separated, countable, and casting contact shadows. Throne, steps, compass base, and all four stones rest on one connected foundation that reaches the bottom bleed. Strong near/mid/far perspective. Fine narrow engraved gold border.
Style/medium: sophisticated finely detailed hand-painted fantasy tarot illustration, opaque RGB full scene.
Lighting/mood: sun-warmed authority, stable architecture, crisp desert atmosphere.
Color palette: red sandstone, blue-green oasis, worn gold, dark indigo-plum robes, natural skin.
Constraints: exactly one emperor, one scepter, one compass, four stones only; compass must be clearly an instrument and not a floating luminous disc or a fifth stone; all props physically supported.
Avoid: extra people, duplicate compass, duplicate scepter, extra geometric solids, floating props, thin or cut-off support, text, lettering, title, numbers, watermark, logo.
```

- 首轮粗看：正面持杖皇帝、左侧落地罗盘、前景四个独立石体及远景绿洲城墙均可辨，砂岩阶梯延展到底。只选定不透明母版；未拆层、未组装、未做统一复核或用户审美确认。
