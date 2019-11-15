export interface ILabelViewModel {
    id: number;
    name: string;

    groupId: number;
}

export interface ILabelWithValuesViewModel extends ILabelViewModel {
    lastValue: number;
    currentValue: number;
    averangeValue: number;
}

export interface ILabelToAddViewModel {
    id: number;
    name: string;
}
