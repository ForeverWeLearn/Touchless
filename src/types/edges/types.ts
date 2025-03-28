import ButtonEdge from "../../components/flow/edges/ButtonEdge.svelte";

export enum EdgeType {
    BUTTON = "button",
}

export const edgeTypes = {
    [EdgeType.BUTTON]: ButtonEdge,
}