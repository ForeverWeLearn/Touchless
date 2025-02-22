export type NodeName = "ROOT" | "GESTURE" | "POINT" | "DRAWING" | "TODO";

export interface GenericData {
  todo: number[];
  children: number[];
  gesture: string;
  reject_gesture: string;
  hold_time: number;
  timeout: number;
  point: number;
}

export interface TodoData {
  once: boolean;
  function: string;
}

export class Node {
  public name: NodeName;
  public id: number;
  public data: GenericData & TodoData;

  constructor(obj: any) {
    this.name = obj.name;
    this.id = obj.id;
    this.data = obj.data;
  }
}
