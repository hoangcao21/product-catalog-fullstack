export type Cursor = string | undefined;

export class CursorHistory {
  private stack: Cursor[] = [];

  push(cursor: Cursor) {
    this.stack.push(cursor);
  }

  pop(): Cursor {
    return this.stack.pop();
  }

  peek(): Cursor {
    return this.stack[this.stack.length - 1];
  }

  exists(): boolean {
    return this.stack.length > 0;
  }

  reset(): void {
    this.stack = [];
  }
}
