import * as assert from "assert";
import { workspace } from "vscode";
import * as extension from "../extension";

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
});
