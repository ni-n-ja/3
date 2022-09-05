import browserSync from "browser-sync";
import chalk from "chalk";
import esbuild from "esbuild";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
import { join, dirname } from "path";
import fs from "fs/promises";

const dev = true;
const bs = browserSync.create();

(async () => {
  try {
    await fs.mkdir("dist");
  } catch (error) {}
  await fs.copyFile(join(dirname(__filename), "src", "index.html"), join(dirname(__filename), "dist", "index.html"));

  esbuild
    .build({
      format: "esm",
      target: "es2017",
      logLevel: "info",
      entryPoints: ["src/index.js"],
      outdir: "./dist",
      chunkNames: "chunks/[name].[hash]",
      incremental: dev,
      loader: {
        ".svg": "text",
        ".vert": "text",
        ".frag": "text",
        ".png": "dataurl",
      },
      bundle: true,
      splitting: true,
      watch: {
        onRebuild(error, result) {
          if (error) console.error("watch build failed:", error);
          else console.log("watch build succeeded:", result);
        },
      },
      platform: "browser",
      external: ["fs", "buffer", "util", "stream", "string_decoder"],
    })
    .catch((err) => {
      console.error(chalk.red(err));
      process.exit(1);
    });

  console.log(chalk.green("The build has finished! 📦\n"));

  const port = 3000;
  console.log(chalk.cyan(`Launching the Shoelace dev server at http://localhost:${port}! 🥾\n`));

  bs.init({
    open: false,
    port,
    logLevel: "info",
    logFileChanges: true,
    notify: true,
    single: true,
    server: {
      baseDir: "dist",
      index: "index.html",
    },
    files: "dist/",
  });

  // bs.watch(["src/"]).on("change", async (filename) => {
  //   console.log(`Source file changed - ${filename}`);
  // });
})();
