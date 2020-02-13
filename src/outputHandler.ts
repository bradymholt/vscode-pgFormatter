import {
  Disposable,
  OutputChannel,
  TextEditor,
  commands,
  window,
  languages
} from "vscode";

let outputChannel: OutputChannel;

/**
 * Append messages to the output channel and format it with a title
 *
 * @param message The message to append to the output channel
 */
export function addToOutput(message: string): void {
  if (!outputChannel){
    return;
  }
  
  const title = `${new Date().toLocaleString()}:`;

  // Create a sort of title, to differentiate between messages
  outputChannel.appendLine(title);
  outputChannel.appendLine("-".repeat(title.length));

  // Append actual output
  outputChannel.appendLine(`${message}\n`);
}

/**
 * Setup the output channel
 * Create a command to show the output channel
 *
 * @returns {Disposable} The command to open the output channel
 */
export function setupOutputHandler(): Disposable {

  // Setup the outputChannel
  outputChannel = window.createOutputChannel("pgFormatter");

  return commands.registerCommand("pgFormatter.open-output", () => {
    outputChannel.show();
  });
}
