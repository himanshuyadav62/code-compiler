declare module 'web-tree-sitter' {
  export default class Parser {
    static init(): Promise<void>;
    static Language: {
      load(path: string): Promise<any>;
    };
    
    constructor();
    setLanguage(language: any): void;
    parse(input: string | ((index: number, position?: Point) => string), oldTree?: Tree): Tree;
  }

  export interface Point {
    row: number;
    column: number;
  }

  export interface Tree {
    rootNode: SyntaxNode;
    edit(edit: Edit): void;
    walk(): TreeCursor;
    getChangedRanges(other: Tree): Range[];
    getEditedRange(other: Tree): Range;
  }

  export interface SyntaxNode {
    type: string;
    startPosition: Point;
    endPosition: Point;
    startIndex: number;
    endIndex: number;
    childCount: number;
    namedChildCount: number;
    firstChild: SyntaxNode | null;
    lastChild: SyntaxNode | null;
    nextSibling: SyntaxNode | null;
    previousSibling: SyntaxNode | null;
    parent: SyntaxNode | null;
    children: SyntaxNode[];
    namedChildren: SyntaxNode[];
    hasError: boolean | (() => boolean);
    isMissing: boolean | (() => boolean);
    child(index: number): SyntaxNode | null;
    namedChild(index: number): SyntaxNode | null;
    descendantForIndex(index: number): SyntaxNode;
    descendantForPosition(position: Point): SyntaxNode;
    walk(): TreeCursor;
  }

  export interface TreeCursor {
    nodeType: string;
    nodeText: string;
    startPosition: Point;
    endPosition: Point;
    startIndex: number;
    endIndex: number;
    gotoFirstChild(): boolean;
    gotoNextSibling(): boolean;
    gotoParent(): boolean;
    currentNode(): SyntaxNode;
  }

  export interface Edit {
    startIndex: number;
    oldEndIndex: number;
    newEndIndex: number;
    startPosition: Point;
    oldEndPosition: Point;
    newEndPosition: Point;
  }

  export interface Range {
    startIndex: number;
    endIndex: number;
    startPosition: Point;
    endPosition: Point;
  }
}
