import * as extension from "../../extension";
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';

import { mockupDocument } from "../util";
// import * as myExtension from '../../extension';

suite("Extension Tests", () => {
  test("Formatting SQL", () => {
    let output = extension.getFormattedText(
      "select id, first_name from people",
      <extension.WorkspaceConfiguration>{},
      <extension.FormattingOptions>{}
    );
    assert.strictEqual(
      output,
      `\
SELECT
    id,
    first_name
FROM
    people
`
    );
  });

  test("size", () => {
    let output = extension.getFormattedText(
      "select id, first_name from people",
      <any>{ spaces: 3 },
      <extension.FormattingOptions>{ tabSize: 8 }
    );
    assert.strictEqual(
      output,
      `\
SELECT
   id,
   first_name
FROM
   people
`
    );
  });

  test("maxLength", () => {
    let output = extension.getFormattedText(
      `-- This is a really long comment that we do not expect to be truncated`,
      <extension.WorkspaceConfiguration>(<any>{ maxLength: 80 }),
      <extension.FormattingOptions>{}
    );
    assert.strictEqual(
      output,
      `-- This is a really long comment that we do not expect to be truncated
`
    );
  });

  test("tabSize from VSCode workspace", () => {
    let output = extension.getFormattedText(
      "select id, first_name from people",
      <extension.WorkspaceConfiguration>{},
      <extension.FormattingOptions>{ tabSize: 8 }
    );
    assert.strictEqual(
      output,
      `\
SELECT
        id,
        first_name
FROM
        people
`
    );
  });

  test("insertSpaces: true from VSCode workspace", () => {
    let output = extension.getFormattedText(
      "select id, first_name from people",
      <extension.WorkspaceConfiguration>{},
      <extension.FormattingOptions>{ insertSpaces: true }
    );
    assert.strictEqual(
      output,
      `\
SELECT
    id,
    first_name
FROM
    people
`
    );
  });

  test("insertSpaces: false from VSCode workspace", () => {
    let output = extension.getFormattedText(
      "select id, first_name from people",
      <extension.WorkspaceConfiguration>{},
      <extension.FormattingOptions>{ insertSpaces: false }
    );
    assert.strictEqual(
      output,
      `\
SELECT
\tid,
\tfirst_name
FROM
\tpeople
`
    );
  });

  test("ignoring a file", async () => {
    let document = mockupDocument(`\
-- pgFormatter-ignore

select id, first_name from people
`);
    let edits = await extension.provideDocumentFormattingEdits(
      document,
      <extension.FormattingOptions>{ tabSize: 8 },
      null
    );

    assert.strictEqual(edits.length, 0);
  });
});
