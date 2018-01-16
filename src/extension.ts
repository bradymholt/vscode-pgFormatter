// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { setupOutputHandler, addToOutput } from "./outputHandler";
import { formatSql, IOptions, CaseOptionEnum } from "psqlformat";

function fullDocumentRange(document: vscode.TextDocument): vscode.Range {
  const lastLineId = document.lineCount - 1;
  return new vscode.Range(
    0,
    0,
    lastLineId,
    document.lineAt(lastLineId).text.length
  );
}

export { WorkspaceConfiguration, FormattingOptions } from "vscode";

export function getFormattedText(
  text: string,
  config: vscode.WorkspaceConfiguration,
  options: vscode.FormattingOptions
): string {
  try {
    let formattingOptions: IOptions = <any>Object.assign({}, config);

    // Convert option strings to enums
    if (config.functionCase != null) {
      formattingOptions.functionCase =
        CaseOptionEnum[<keyof typeof CaseOptionEnum>config.functionCase];
    }
    if (config.keywordCase != null) {
      formattingOptions.keywordCase =
        CaseOptionEnum[<keyof typeof CaseOptionEnum>config.keywordCase];
    }

    if (!formattingOptions.spaces && options.tabSize) {
      // If spaces config not specified, use the FormattingOptions value from VSCode workspace
      formattingOptions.spaces = Number(options.tabSize);
    }

    let formatted = formatSql(text, formattingOptions);
    return formatted;
  } catch (err) {
    addToOutput(`ERROR: ${err}`);
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
          let config = vscode.workspace.getConfiguration("pgFormatter");

          let formattedText = getFormattedText(text, config, options);

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
