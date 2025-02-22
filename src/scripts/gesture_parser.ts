import { Node, type GenericData, type TodoData } from "../utils/node";
import { labels, type Label } from "../utils/labels";
import { Executor } from "./executor";
import { Queue } from "../utils/queue";

export class GestureParser {
  public hold_time = 0;
  public last_match = 0;

  private nodes: Node[] = [];
  private current_node_id = 0;
  private current_gesture!: Label;
  private queue: Queue<[number, number]>; // label_id & time
  private executor: Executor;

  constructor(nodes: Node[]) {
    this.nodes = nodes;
    this.queue = new Queue<[number, number]>();
    this.executor = new Executor();
  }

  public async parse(label_id: number, keypoints: number[][]) {
    await this.preprocess(label_id);

    const current_node = this.nodes[this.current_node_id];

    if (this.matching(current_node)) {
      this.last_match = performance.now();

      await this.execute_todo(current_node, keypoints);

      if (this.only_todo_once(current_node)) {
        this.reset();
      }
    } else if (performance.now() - this.last_match > current_node.data.timeout) {
      console.log(`${performance.now()} ${this.last_match} ${current_node.data.timeout}`)
      this.reset();
    }

    current_node.data.children.forEach(async (child_node_id) => {
      const child_node = this.nodes[child_node_id];

      if (this.matching(child_node)) {
        this.current_node_id = child_node_id;
        console.log(`Current node id: ${child_node.id}`);
      }
    });
  }

  private async preprocess(label_id: number) {
    const front = this.queue.peek_front();
    if (front && front[0] !== label_id) {
      this.queue.clear();
    }

    const now = performance.now();
    this.queue.push([label_id, now]);

    const back = this.queue.peek_back();
    if (back) {
      this.current_gesture = labels[back[0]];
      this.hold_time = now - back[1];
    }
  }

  private async execute_todo(node: Node, keypoints: number[][]) {
    const data = node.data as GenericData;

    if (data.todo.length == 0) {
      return;
    }

    data.todo.forEach(async (todo_node_id) => {
      const todo_data = this.nodes[todo_node_id].data as TodoData;
      await this.executor.parse(todo_data.function, keypoints[data.point]);
    });
  }

  private matching(node: Node): boolean {
    const data = node.data as GenericData;
    if (this.current_gesture == data.gesture && this.hold_time >= data.hold_time) {
      return true;
    }
    return false;
  }

  private only_todo_once(node: Node): boolean {
    return node.data.children.length == 0 && node.data.todo.every((id) => this.nodes[id].data.once);
  }

  private reset() {
    console.log("Operation reset!");
    this.current_node_id = 0;
  }
}
