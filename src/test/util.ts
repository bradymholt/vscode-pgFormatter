import { TextDocument } from 'vscode';

export class Position {
	constructor(public line: number, public character: number) { }
}

export class Range {
	constructor(public start: Position, public end: Position) { }
}

export function mockupDocument(text: string): TextDocument {
	const lines = text.split('\n');

	return <any>{
		lineCount: lines.length,
		lineAt: (line: number) => ({ lineNumber: line, text: lines[line] }),
		positionAt: (offset: number) => new Position(0, offset),
		getText: () => text
	};
}