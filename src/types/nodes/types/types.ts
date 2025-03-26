import type { ConditionNode, ConditionNodeData } from "../condition";
import type { EntryNode, EntryNodeData } from "../entry";
import type { TaskNode, TaskNodeData } from "../task";

export type CustomNode = EntryNode | ConditionNode | TaskNode;
export type NodeData = EntryNodeData | ConditionNodeData | TaskNodeData;
