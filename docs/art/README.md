# 美术制作资料

> 历史制作记录，非运行所需。本目录是这套牌在原项目中制作时留下的规范与过程记录，按原样收录以便追溯；其中提到的原图、分层工程、Blender 文件、审查截图和原项目文档（如 WORKLOG、`docs/plans/`、`output/` 下的路径）不在本仓库中，相关链接会失效。本机绝对路径已统一替换为 `~/` 或 `<web-repo>/`。

## 内容

| 路径 | 说明 |
| --- | --- |
| [spec/](spec/README.md) | v2.2 制作规范：总规则、月亮五样本指南、21 张牌的逐牌制作单（`spec/cards/`）、母版与拆层提示词（`production-prompts.json`）、manifest 模板 |
| [series-manifest.json](series-manifest.json) | 22 张牌 × 5 个主题槽位的总表 |
| `themes/major-XX/theme-0Y/` | 每个主题槽位的 `manifest.json`、`README.md`，以及（如有）`production-notes.md`、`generation-prompts.json` |

## 怎么读

- `theme-01` 是基础牌面，`theme-02` 至 `theme-05` 是四个独立主题，主题之间没有升级关系。
- manifest 记录的是真实执行结果：使用的工具与模型、提示词、输入输出文件的 SHA-256、失败的调用、拒收与返修结论。状态字段（如 `planned`、`needs-rework`）反映的是记录当时的进度，最终上线素材以仓库 `public/tarot/` 与 Release 闪卡包为准。
- 母版主要由 Codex 内置 `image_gen`（多数记录未注明模型）与 `gpt-image-2` 生成，具体以各 manifest 为准；分层后用 Blender 与 Three.js 组装成闪卡，组装流程基于 RuiC Card Skill（见 [THIRD_PARTY_NOTICES.md](../../THIRD_PARTY_NOTICES.md)）。

这些资料与牌面一样按 [CC BY-NC-SA 4.0](../../LICENSE-ASSETS.md) 授权。
