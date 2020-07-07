import { GroupModel } from './group';

export interface LabelModel {
    id: number;
    name: string;
}

export interface LabelFullModel {
    id: number;
    name: string;

    currValue: number;
    lastValue: number;
    avgValue: number;
}
