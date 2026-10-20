// Downloads the full holographic flashcard viewers (≈760 MB) from the GitHub Release into
// public/tarot/flashcards/, verifying the archive hash and every extracted file.
// The app runs without them; they add the standalone 3D viewer page for each of the 110 cards.
import { createHash } from "node:crypto";
import { createReadStream, createWriteStream, existsSync } from "node:fs";
import { mkdir, readFile, rename, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const RELEASE = {
  tag: "flashcards-v20261009",
  file: "moonlit-tarot-flashcards-v20261009.tar.gz",
  sha256: "15491cda3b3886cd3dc9c8fc7ce0fdb26c3202e63c6a3181c11fd153ad3becde",
};
const REPO = process.env.MOONLIT_TAROT_REPO || "Shimmersss/moonlit-tarot";
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const cacheDir = path.join(root, ".flashcards-cache");
const archive = path.join(cacheDir, RELEASE.file);
const target = path.join(root, "public", "tarot", "flashcards");

async function sha256(file) {
  const hash = createHash("sha256");
  await pipeline(createReadStream(file), hash);
  return hash.digest("hex");
}

async function download() {
  if (existsSync(archive) && (await sha256(archive)) === RELEASE.sha256) {
    console.log("使用已缓存的压缩包 / using cached archive");
    return;
  }
  const url = `https://github.com/${REPO}/releases/download/${RELEASE.tag}/${RELEASE.file}`;
  console.log(`下载 / downloading ${url}`);
  const response = await fetch(url);
  if (!response.ok || !response.body) throw new Error(`下载失败 / download failed: HTTP ${response.status}`);
  await mkdir(cacheDir, { recursive: true });
  const partial = `${archive}.part`;
  await pipeline(Readable.fromWeb(response.body), createWriteStream(partial));
  const actual = await sha256(partial);
  if (actual !== RELEASE.sha256) {
    await rm(partial, { force: true });
    throw new Error(`压缩包哈希不符 / archive hash mismatch: ${actual}`);
  }
  await rename(partial, archive);
}

async function verifyExtracted() {
  const sums = (await readFile(path.join(target, "SHA256SUMS"), "utf8")).trim().split("\n");
  let checked = 0;
  for (const line of sums) {
    const [expected, relative] = line.split(/\s+\*?/, 2);
    const actual = await sha256(path.join(target, relative));
    if (actual !== expected) throw new Error(`文件哈希不符 / file hash mismatch: ${relative}`);
    checked += 1;
  }
  return checked;
}

await download();
console.log(`解压到 / extracting into ${path.relative(root, target)}`);
execFileSync("tar", ["-xzf", archive, "-C", target], { stdio: "inherit" });
const count = await verifyExtracted();
console.log(`完成：${count} 个文件校验通过 / done: ${count} files verified`);
console.log("打开 /tarot/flashcards/v20261009/major-18/theme-01/index.html 查看全息闪卡 / open that path to view a card");
