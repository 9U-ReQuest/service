import type { BuildConfig } from "bun";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const BUILD_CONFIG = {
  PACKAGE_NAME: "@request/ui-kit",
  BUN_BUILD: {
    target: "node" as const,
    format: "esm" as const,
    sourcemap: "external" as const,
  } satisfies Partial<BuildConfig>,
  TSUP_COMMAND: (srcFile: string, outDir: string) =>
    `tsup ${srcFile} --dts-only --outDir ${outDir}`,
  TAILWIND_COMMAND: (srcFile: string, outFile: string) =>
    `tailwindcss -i ${srcFile} -o ${outFile} --minify`,
};

const findPackageRoot = (startDir: string): string => {
  let currentDir = startDir;
  while (currentDir !== path.parse(currentDir).root) {
    const packageJsonPath = path.join(currentDir, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
      if (packageJson.name === BUILD_CONFIG.PACKAGE_NAME) {
        return currentDir;
      }
    }
    currentDir = path.dirname(currentDir);
  }
  throw new Error(`${BUILD_CONFIG.PACKAGE_NAME} package root not found`);
};

const execPromise = (command: string, options: object): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(command, options, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
      }
      resolve();
    });
  });
};

const buildProject = async (srcDir: string, distDir: string, packageRoot: string) => {
  console.log("Building project...");

  try {
    await Bun.build({
      entrypoints: [path.join(srcDir, "index.ts")],
      outdir: distDir,
      ...BUILD_CONFIG.BUN_BUILD,
    });
    console.log("Bun build completed");

    await execPromise(BUILD_CONFIG.TSUP_COMMAND(path.join(srcDir, "index.ts"), distDir), {
      cwd: packageRoot,
    });
    console.log("Types build completed");

    const srcTailwindPath = path.join(srcDir, "styles", "tailwind.css");
    const distStylesPath = path.join(distDir, "styles.css");
    await execPromise(BUILD_CONFIG.TAILWIND_COMMAND(srcTailwindPath, distStylesPath), {
      cwd: packageRoot,
    });
    console.log("Tailwind CSS compiled");
  } catch (error) {
    console.error("Build failed:", error);
    throw error;
  }
};

const main = () => {
  try {
    const packageRoot = findPackageRoot(process.cwd());
    const srcDir = path.join(packageRoot, "src");
    const distDir = path.join(packageRoot, "dist");

    console.log("Package root:", packageRoot);
    console.log("Source directory:", srcDir);
    console.log("Distribution directory:", distDir);

    if (!fs.existsSync(srcDir)) {
      console.error(`Source directory does not exist: ${srcDir}`);
      process.exit(1);
    }

    buildProject(srcDir, distDir, packageRoot).catch((error) => {
      console.error("An error occurred during the build:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
};

if (import.meta.main) {
  main();
}
