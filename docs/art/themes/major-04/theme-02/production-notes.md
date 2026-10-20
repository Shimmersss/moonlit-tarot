# 玄武岩座 · 母版生图记录

## 2026-09-19

- 输入身份/画风参考：`front/public/tarot/major-04.webp`，已实际查看，SHA-256 `4cadeeefe7a3f4dc9ac54b92f832d7fdc8709b8c60459e2e868e8ed49f2b5f60`。
- 工具：内置 `image_gen`。本次调用失败：`connection failed: error sending request`；没有生成文件，目录保持 `planned`，未选择母版。
- 完整实际提示词：`Create ONE original opaque full-frame 1024x1536 vertical Emperor tarot master, theme 玄武岩座 / Basalt Throne. Use the original only for Emperor identity and tarot style: exactly one mature dark-haired BEARDED crowned emperor in deep indigo and plum robes, seated on a solid throne, holding one upright scepter. Preserve ONE clearly visible compass and exactly FOUR distinct simple stone solids on the front arc: cube, pyramid, sphere, truncated pyramid. New setting: low camera centered on monumental basalt throne, charcoal cooled lava plateau with distant SMALL volcanic mountains and a clearly marked cooled boundary. Palette charcoal black, molten copper accents, gray white, natural skin. A single thick basalt platform supports throne, emperor's feet, compass and all four solids and extends completely to bottom bleed. Four solids separated and countable, each with contact shadow; compass not mistaken for fifth solid. Fine painterly fantasy tarot, restrained narrow gold frame, imposing structural depth. One emperor, one scepter, one compass, four solids; no text, title, letters, numbers, watermark or logo. No floating rock fragments or cut-off base.`
- 待额度恢复后重试；不得用原画复制件或空白文件替代生图。

## 2026-09-21 · 成功重试

- 工具：内置 `image_gen`。原始生成文件：`~/.codex/generated_images/01a0c1e3-6ec7-7be2-b136-eafc35dd3e3d/exec-33009920-4638-4a1d-9939-9db69fd55f14.png`；保留原件，复制到 `source/master-v01.png`。
- 输入 SHA-256：`4cadeeefe7a3f4dc9ac54b92f832d7fdc8709b8c60459e2e868e8ed49f2b5f60`。输出 SHA-256：`7efe02263636bb2faf92947b86eca4a76cb392b606e4c9454d4bdc0f4b6d2716`；1024×1536，RGB，3206011 bytes。
- 完整实际提示词：

```text
Use case: stylized-concept
Asset type: opaque full-frame tarot card master for later holographic card production
Primary request: Create ONE original opaque full-frame 1024x1536 vertical Emperor tarot master, theme 玄武岩座 / Basalt Throne.
Input images: Image 1 is an identity and painterly tarot-style reference only; create a new composition.
Subject: exactly one mature dark-haired BEARDED crowned emperor in deep indigo and plum robes, seated on a solid throne, holding exactly one upright scepter. Preserve exactly ONE clearly visible physical compass and exactly FOUR distinct simple stone solids on the front arc: one cube, one pyramid, one sphere, one truncated pyramid.
Scene/backdrop: low camera centered on a monumental basalt throne; charcoal cooled-lava plateau with distant SMALL volcanic mountains and a clear cooled boundary. A single thick basalt platform supports throne, emperor's feet, compass, and all four solids and extends completely to the bottom bleed.
Composition/framing: centered low-angle throne, four stones arranged in a separated front arc, each fully visible and individually countable with a contact shadow; distant volcanoes remain small. Strong near/mid/far depth. Restrained narrow gold frame.
Style/medium: finely detailed hand-painted fantasy tarot illustration, sophisticated and structurally believable, opaque RGB full scene.
Lighting/mood: imposing, stable, austere; subtle molten-copper rim light without turning skin metallic.
Color palette: charcoal black, molten copper accents, gray white, deep indigo and plum robes, natural skin.
Constraints: exactly one emperor, one scepter, one compass, four stones only; compass must read as a grounded navigational instrument and must not resemble a fifth stone or a floating glowing disc; all furniture and props physically supported; complete base reaches bottom edge.
Avoid: extra people, duplicate compass, duplicate scepter, extra geometric solids, floating rocks, cut-off support base, text, title, letters, numbers, watermark, logo.
```

- 首轮粗看：持杖蓄须皇帝、落地罗盘与前景四个独立几何石体均可辨，玄武岩台基完整延展到底边。只选定不透明母版；未拆层、未组装、未做统一复核或用户审美确认。
