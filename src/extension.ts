// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { setupOutputHandler, addToOutput } from "./outputHandler";
import { execSync } from "child_process";
import path = require("path");

function fullDocumentRange(document: vscode.TextDocument): vscode.Range {
  const lastLineId = document.lineCount - 1;
  return new vscode.Range(
    0,
    0,
    lastLineId,
    document.lineAt(lastLineId).text.length
  );
}

function getFormattedText(
  text: string,
  config: vscode.WorkspaceConfiguration
): string {
  try {
   return "";

  } catch (err) {
    addToOutput(`ERROR: ${err}`);
    return text;
  }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider(
      { language: "sql" },
      {
        async provideDocumentFormattingEdits(
          document: vscode.TextDocument,
          options: vscode.FormattingOptions,
          token: vscode.CancellationToken
        ): Promise<vscode.TextEdit[]> {
          const text = document.getText();
          let config = vscode.workspace.getConfiguration("pgformatter");

          let formattedText = getFormattedText(text, config);

          return [
            vscode.TextEdit.replace(fullDocumentRange(document), formattedText)
          ];
        }
      }
    ),
    setupOutputHandler()
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
