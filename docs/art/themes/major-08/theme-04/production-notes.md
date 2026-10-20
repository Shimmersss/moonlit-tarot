# 琉璃花庭 · 母版生图记录

## 2026-09-21 · 首次调用失败

- 输入身份/画风参考：`front/public/tarot/major-08.webp`，已实际查看，SHA-256 `006b179d8b39c4e3e5e2b69a5bf5fbc7c7fbcbd7774bfec625fefb72e6893e05`。
- 工具：内置 `image_gen`。调用在持续等待后失败：`network error: error sending request for image edit endpoint`；没有生成文件，未选择母版。
- 完整实际提示词：

```text
Use case: stylized-concept
Asset type: opaque full-frame tarot card master for later holographic card production
Primary request: Create ONE original opaque full-frame 1024x1536 vertical Strength tarot master, theme 琉璃花庭 / Stained-Glass Flower Court.
Input images: Image 1 is an identity, symbolic relationship, and painterly tarot-style reference only; create a new composition.
Subject: exactly ONE graceful dark-haired woman positioned to the RIGHT and exactly ONE full-sized golden male lion reclining horizontally in the LOWER LEFT. The lion is calm with eyes fully closed and mouth closed. The woman kneels beside the lion, using BOTH visible hands to gently touch and stroke its mane; palms remain naturally on the fur without intersecting the head.
Scene/backdrop: elegant flower pavilion built from stained glass, gold leaves, and garden arches. Translucent colored side light crosses the pavilion and falls on the floor, never obscuring the woman's face or hands.
Composition/framing: woman right, lion lying left-lower across a complete cushioned area. Pavilion floor tiles and a broad soft cushion form a continuous grounded base under woman, lion, paws, and drapery, extending to bottom bleed. Restrained narrow stained-glass and gold-leaf tarot border.
Style/medium: exquisite hand-painted fantasy tarot illustration with believable stained-glass refraction, opaque RGB full scene.
Lighting/mood: serene trust, tenderness, garden sanctuary; soft lateral colored light.
Color palette: soft pink, blue-green, pale gold, natural skin, warm lion gold.
Constraints: exactly one woman and one lion; lion resting with closed eyes and closed mouth; both hands visibly and gently contact the mane; colored light stays off face and hands; complete floor and cushion.
Avoid: extra people, extra lions or cubs, roaring, open mouth, attack, pounce, circus, animal-taming performance, hand through skull, floating subjects, fragmented cushion, text, title, letters, numbers, watermark, logo.
```

- 下一步：保持同一规格重试，不用复制原图、空白文件或伪造产物替代。

## 2026-09-21 · 重试成功

- 工具：内置 `image_gen`。原始生成文件：`~/.codex/generated_images/01a0c1e3-6ec7-7be2-b136-eafc35dd3e3d/exec-c3136621-439b-47ee-a902-6657884ce754.png`；保留原件，复制到 `source/master-v01.png`。输出 SHA-256 `a665c56f8cbf7ab869cf1dc7523f3b78d9c0a47d823717262ead7228993f1326`；1024×1536，RGB，3736796 bytes。
- 完整实际提示词与首次失败调用相同，完整文本已保留在上一节和 manifest 的两次 generationRuns 中。
- 首轮粗看：人物偏右、单狮横卧左下且闭眼，双手与鬃毛接触清楚，琉璃侧光落在地砖与软垫上。只选定不透明母版；未拆层、未组装、未做统一复核或用户审美确认。
