# 雪谷回响：前景/背景生产记录（临时交接）

范围仅为 1024×1536 同画布前景键色源、真实 RGBA `assets/subject.png` 与
不透明 `assets/background.png`。尚未创建 Blender 或网页工程。

## 输入母版

- `master-v01.png` — SHA-256 `17d480a26afd5940ebee661561c079da37ef9b758019b80385a1464f5215bf00`，3,376,079 bytes。

## 键色前景源

第一次 built-in ImageGen（call ID `exec-2830acd3-f197-4e5f-a0ae-24e28051c691`）提示：

```text
Use case: background-extraction
Asset type: same-coordinate chroma-key source layer for the displayed 1024×1536 Judgement tarot master artwork.
Input image: the supplied Snow Valley Echoes master is the edit target.
Primary request: Preserve at exactly the same pixels and scale the entire connected foreground group: the luminous female angel with both enormous wings fully intact, halo, hair, trumpet and all flowing translucent robes; all five bundled human figures on the lower-right snowy ledge; the one golden-brown dog; and the continuous foreground snow platform/ground under their feet and paws through the lower bleed. Replace every other pixel—sky, sun, mountain valley, distant pines, distant snow, clouds, waterfalls—with one perfectly uniform flat chroma green #00FF00.
Constraints: do not crop, recenter, resize, redraw or change pose/anatomy. Preserve both wings to their outermost tips, the entire trumpet, five figures, dog, and every contact shadow/ground connection. No checkerboard, gradients, background remnants, text, border or watermark. Green must be one exact solid color to allow deterministic alpha conversion.
```

- 输出 `subject-green-v01.png` — SHA-256 `a5b548fbd9b06d45bb9eec576353051ea26ab9f809d3e58fb3a61132f46c1a71`，2,308,731 bytes；拒收，背景未满足纯绿幕要求，保留为失败证据。

第二次 built-in ImageGen（call ID `exec-820e92aa-7621-4dba-97e1-fac5ee7898b1`）提示：

```text
Use case: background-extraction
Asset type: strict technical color-matte source, 1024×1536.
Input image: supplied Judgement Snow Valley Echoes master.
Primary request: Make a two-color technical image: (1) preserve the angel, BOTH wings, halo, trumpet, all flowing robes, all five people, dog, and the lower foreground snow ledge exactly in place; (2) set every other pixel in the image to exactly RGB (0,255,0), flat pure neon green #00FF00.
This is NOT an artistic background replacement. The output background must visibly look like a studio green-screen with no dark/black/grey gradient, landscape, lighting, texture, or shadows outside the named foreground group. Keep the figures and ground fully connected, including five human figures, dog paws, and snow ground through the bottom edge. No text, border, watermark, checkerboard, crop, resizing or subject changes.
```

- 采用 `subject-green-v02.png` — SHA-256 `e3b8548f81c2c2c0dab8698a8921725696664d50fc41148c91779b74e363c56c`，2,271,297 bytes。人工检查：两翼、号角、五人、一犬及连续雪地均完整。
- `key_subject_green.py` 以该键色产物与原始母版的像素差生成 alpha，并以母版可见像素去除生成图的绿溢。`assets/subject.png` 是真实 RGBA，SHA-256 `eea7c53fe4096a671095f6f0ca9a8079bb0e5789c413e90280927f850bdb31ba`，3,124,045 bytes；透明像素约 49.15%。本地与背景复合人工检查通过，未见人物/犬/翅膀缺损。

## 无主体背景

built-in ImageGen（call ID `exec-eea5e409-8c11-4ee8-ba1d-241d963a150e`）提示：

```text
Use case: precise-object-edit
Asset type: opaque RGB 1024×1536 background layer for a Snow Valley Echoes Judgement tarot card.
Input image: supplied master is the edit target.
Primary request: Remove the complete foreground group—the luminous female angel, both wings, halo, trumpet, all translucent robes, all five people, dog, and the entire foreground snowy ledge. Fill their areas naturally with a coherent continuous distant snow valley: mountain ridges, a warm sunrise, cloud banks, small distant pines, snowy terrain and river/waterfalls as appropriate.
Constraints: retain the original image's vertical composition, cool blue-lavender and warm sunrise palette, painterly detail, and environmental lighting. The layer must be fully opaque. Absolutely no angel, wings, halo, trumpet, people, dog, foreground ledge, silhouettes, duplicate figures, empty holes, text, borders, watermark, checkerboard, transparency or chroma green.
```

- 采用 `assets/background.png` — RGB，SHA-256 `724f54770f59280e18e4000d3bdacb05ee020ca6dca5ae8dfcc1d57aac2ec084`，3,028,950 bytes。人工检查：无天使、人物、犬、平台或残影，雪谷连续且完全不透明。

