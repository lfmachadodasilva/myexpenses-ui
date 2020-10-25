export interface LabelModel {
    id: number;
    name: string;

    /** relations */
    groupId: number;
}

export interface LabelFullModel {
    id: number;
    name: string;

    currValue: number;
    lastValue: number;
    avgValue: number;

    /** relations */
    groupId: number;
}
