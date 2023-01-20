import * as vscode from "vscode";
import { basename, dirname, extname, join, relative, sep } from "path";

export function substituteVariables(value: string): string {
  if (value?.includes("${workspaceFolder}")) {
    value = value.replace(/\${workspaceFolder}/g, getWorkspaceFolder());
  }

  if (value?.includes("${workspaceFolderBasename}")) {
    value = value.replace(
      /\${workspaceFolderBasename}/g,
      basename(getWorkspaceFolder())
    );
  }

  if (value?.includes("${file}")) {
    value = value.replace(/\${file}/g, getFile());
  }

  if (value?.includes("${relativeFile}")) {
    value = value.replace(/\${relativeFile}/g, getRelativeFile());
  }

  if (value?.includes("${relativeFileDirname}")) {
    value = value.replace(/\${relativeFileDirname}/g, getRelativeFileDirname());
  }

  if (value?.includes("${fileBasename}")) {
    value = value.replace(/\${fileBasename}/g, getFileBasename());
  }

  if (value?.includes("${fileBasenameNoExtension}")) {
    value = value.replace(
      /\${fileBasenameNoExtension}/g,
      getFileBasenameNoExtension()
    );
  }

  if (value?.includes("${fileDirname}")) {
    value = value.replace(/\${fileDirname}/g, getFileDirname());
  }

  if (value?.includes("${fileExtname}")) {
    value = value.replace(/\${fileExtname}/g, getFileExtname());
  }

  if (value?.includes("${cwd}")) {
    value = value.replace(/\${cwd}/g, process.cwd());
  }

  if (value?.includes("${lineNumber}")) {
    const lineNumber = getLineNumber();

    if (lineNumber && parseInt(lineNumber)) {
      value = value.replace(/\${lineNumber}/g, getLineNumber());
    }
  }

  if (value?.includes("${selectedText}")) {
    const selectedText = getSelection().join();

    if (selectedText) {
      value = value.replace(/\${selectedText}/g, selectedText);
    }
  }

  if (value?.includes("${execPath}")) {
    value = value.replace(/\${execPath}/g, process.execPath);
  }

  if (value?.includes("${pathSeparator}")) {
    value = value.replace(/\${pathSeparator}/g, sep);
  }

  return value;
}

function getFile(): string {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage("No open editors");
    return;
  }

  return editor.document.uri.fsPath;
}

function getRelativeFile(): string {
  const workspaceFolder = getWorkspaceFolder();

  return relative(workspaceFolder, getFile());
}

function getRelativeFileDirname(): string {
  return dirname(getRelativeFile());
}

function getFileBasename(): string {
  return basename(getFile());
}

function getFileBasenameNoExtension(): string {
  return basename(getFile(), getFileExtname());
}

function getFileDirname(): string {
  return dirname(getFile());
}

function getFileExtname(): string {
  return extname(getFile());
}

function getLineNumber(): string {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage("No open editors");
    return;
  }

  return String(editor.selection.active.line);
}

function getSelection(): string[] {
  return vscode.window.activeTextEditor.selections.map((selection) => {
    return vscode.window.activeTextEditor.document.getText(
      new vscode.Range(
        selection.start.line,
        selection.start.character,
        selection.end.line,
        selection.end.character
      )
    );
  });
}

function getWorkspaceFolder(appendPath = ""): null | string {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showWarningMessage("No open editors");
    return;
  }

  const { uri } = vscode.workspace.getWorkspaceFolder(editor?.document?.uri);

  if (!uri.fsPath?.length) {
    vscode.window.showWarningMessage("No open workspaces");
    return;
  }

  return appendPath?.length ? join(uri.fsPath, appendPath) : uri.fsPath;
}
