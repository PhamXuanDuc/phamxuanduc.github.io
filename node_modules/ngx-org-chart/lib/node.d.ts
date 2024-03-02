export interface INode {
    name: string;
    cssClass: string;
    image: string;
    title: string;
    childs: INode[];
}
export declare class Node implements INode {
    name: string;
    cssClass: string;
    image: string;
    title: string;
    childs: Node[];
    parent?: Node;
    constructor(structure: string[], parent?: Node);
}
