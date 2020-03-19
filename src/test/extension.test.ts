import * as extension from "../extension";
import { mockupDocument } from "./util";
import * as assert from "assert";

suite("Extension Tests", () => {
  test("Formatting SQL", () => {
    let output = extension.getFormattedText(
      "select id, first_name from people",
      <extension.WorkspaceConfiguration>{},
      <extension.FormattingOptions>{}
    );
    assert.equal(
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
    assert.equal(
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
    assert.equal(
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
    assert.equal(
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

  test("useSpaces from VSCode workspace", () => {
    let output = extension.getFormattedText(
      "select id, first_name from people",
      <extension.WorkspaceConfiguration>{},
      <extension.FormattingOptions>{ insertSpaces: false }
    );
    assert.equal(
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

    assert.equal(edits.length, 0);
  });
});
