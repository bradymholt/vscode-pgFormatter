import * as path from 'path';
import * as fs from 'fs';

import { downloadAndUnzipVSCode, runTests } from '@vscode/test-electron';

function resolveMacOSExecutablePath(vscodeExecutablePath: string): string {
	if (process.platform !== 'darwin' || fs.existsSync(vscodeExecutablePath)) {
		return vscodeExecutablePath;
	}

	const macOSDir = path.dirname(vscodeExecutablePath);
	const contentsDir = path.dirname(macOSDir);
	const infoPlistPath = path.join(contentsDir, 'Info.plist');

	try {
		const infoPlist = fs.readFileSync(infoPlistPath, 'utf8');
		const match = infoPlist.match(/<key>CFBundleExecutable<\/key>\s*<string>([^<]+)<\/string>/);
		if (match) {
			const resolvedExecutablePath = path.join(macOSDir, match[1]);
			if (fs.existsSync(resolvedExecutablePath)) {
				return resolvedExecutablePath;
			}
		}
	} catch {
		// Fall back to scanning the app bundle contents below.
	}

	try {
		const executables = fs.readdirSync(macOSDir, { withFileTypes: true })
			.filter(entry => entry.isFile())
			.map(entry => path.join(macOSDir, entry.name));

		if (executables.length === 1) {
			return executables[0];
		}
	} catch {
		// Fall back to the original path if the bundle can't be inspected.
	}

	return vscodeExecutablePath;
}

async function main() {
	try {
		// When running tests from inside VS Code's integrated terminal, this env
		// var is inherited and makes the spawned Electron binary act as Node.
		delete process.env.ELECTRON_RUN_AS_NODE;

		// The folder containing the Extension Manifest package.json
		// Passed to `--extensionDevelopmentPath`
		const extensionDevelopmentPath = path.resolve(__dirname, '../../');

		// The path to test runner
		// Passed to --extensionTestsPath
		const extensionTestsPath = path.resolve(__dirname, './suite/index');
		const vscodeExecutablePath = resolveMacOSExecutablePath(
			await downloadAndUnzipVSCode({ extensionDevelopmentPath })
		);

		// Download VS Code, unzip it and run the integration test
		await runTests({ extensionDevelopmentPath, extensionTestsPath, vscodeExecutablePath });
	} catch (err) {
		console.error('Failed to run tests');
		process.exit(1);
	}
}

main();
