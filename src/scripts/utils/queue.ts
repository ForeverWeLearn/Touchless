export class Queue<T> {
  private items: Record<number, T>;
  private backIdx: number;
  private frontIdx: number;

  constructor() {
    this.items = {};
    this.backIdx = 0;
    this.frontIdx = 0;
  }

  public push(element: T): void {
    this.items[this.frontIdx] = element;
    this.frontIdx++;
  }

  public pop(): void {
    if (this.empty()) return;

    delete this.items[this.backIdx];
    this.backIdx++;
  }

  public peek_back(): T | undefined {
    return this.empty() ? undefined : this.items[this.backIdx];
  }

  public peek_front(): T | undefined {
    return this.empty() ? undefined : this.items[this.frontIdx - 1];
  }

  public empty(): boolean {
    return this.backIdx === this.frontIdx;
  }

  public size(): number {
    return this.frontIdx - this.backIdx;
  }

  public clear(): void {
    this.items = {};
    this.backIdx = 0;
    this.frontIdx = 0;
  }
}
