# 潮声苏醒 — 分层生产记录（临时）

范围仅限 `subject`、同画布 chroma 源与 `background`；尚未制作 Blender、网页或验收工程。

## 前景

2026-09-17，`built-in image_gen`，调用 `exec-b6db9e6e-8dbd-4e51-be94-a39e6bff8d4b`：

```text
Use case: background-extraction
Asset type: same-coordinate chroma-key source layer for the displayed 1024×1536 Judgement tarot master artwork, theme 潮声苏醒.
Input image: the immediately previous displayed master is the edit target.
Primary request: preserve at exactly the same coordinates the complete foreground group: the entire upper angel, both wings, halo, trumpet, all flowing clothing, plus all five humans, the single dog, every limb and foot/paw, contact shadows, and the continuous foreground stone terrace beneath all figures through the lower bleed. Replace every other pixel—sky, clouds, ocean, distant rocks, cliffs, buildings and plants—with exactly one perfectly uniform flat chroma green #00FF00.
Constraints: do not resize, crop, recenter, redraw, change face, pose, anatomy, lighting, objects, or count. Keep all connected foreground group details including translucent cloth and wing edges. Do not leave any original background remnants. No checkerboard, gradient, text, border, watermark or baked holographic effects. The green must be a single exact solid color for deterministic alpha conversion later.
```

原始输出 `rejected/subject-green-v01-nonuniform-rejected.png`（SHA-256 `fcd6cd79dd92ae7848dcfcc547f4fefdf63d2e6b2297f330e796b1ef83536ff4`）没有遵守单色绿幕要求，故不得当作 chroma 源；但它是 1024×1536 的真实 RGBA 前景输出，人工在白底复核中确认天使、双翼、号角、五人、狗、脚/爪与石台均完整可见。因此保留其为可追溯原始输入，并无损复制为 `../assets/subject.png`（SHA-256 `44807085fbf0d2663a5ef46a6a72deb25deae6dd545d92bbf4c91b2370224b83`）。

`make_subject_assets.py` 用该实际 alpha 在固定 `#00FF00` 底板上合成 `subject-chroma-derived-v02.png`（SHA-256 `b8721c77aae0e42b8e1f6c87b1ccdc22c1330152fb0b962b72c64e8a9656f74c`）。零 alpha 的 605,310 像素均为精确 `#00FF00`；这是一份可复建、同 1024×1536 坐标的 chroma 参考，不将它误记成生图工具直接产出的绿幕。

## 背景

2026-09-17，`built-in image_gen`，调用 `exec-1dd94a8a-30d2-422c-bd1b-bd4e8c40953c`：

```text
Use case: precise-object-edit
Asset type: opaque 1024×1536 background layer for the displayed Judgement tarot master artwork, theme 潮声苏醒.
Input image: use the immediately previous displayed master as the exact edit target.
Primary request: remove every foreground figure and their contact shadows: the upper angel, both wings, halo, trumpet, all five people, the single dog, and their immediate foreground terrace. Restore a natural continuous background at every removed region, retaining the same painterly dawn coastal world: luminous clouds and rays, blue ocean, distant rock formations, cliffs, waterfall city at right, and natural continuation of a distant empty coastal stone terrace at the lower area.
Constraints: output must be fully opaque RGB. No angel, no wings, no halo, no trumpet, no person, no dog, no foreground silhouette, no contact shadow, no duplicated figures, no blank holes, no green/chroma/checkerboard, no text, border, watermark or baked holographic effects. Keep the 1024×1536 vertical composition and palette.
```

`../assets/background.png`（SHA-256 `5a8569d28d15e0232a9c7bee8a795e56f9fbcecb92833a0c31cb7c0eba2da734`）为 1024×1536 RGB；人工首检未见人物、动物、天使、翅膀、号角或空洞。

## 本次人工检查

- `assets/subject.png`：在黑、白、灰底检查；半透明衣料与翼缘存在，但五人、狗、四肢和连续石台没有明显裁切。
- `assets/background.png`：确认不透明 RGB，空白海岸/云海画面无残余前景。
- 未进行合成、倾斜、Blender、GLB 或网页验收；这些工作不在本子任务范围。
