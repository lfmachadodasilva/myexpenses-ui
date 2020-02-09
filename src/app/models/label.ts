export interface Label {
    id: string;
    name: string;

    groupId: string;
}

export interface LabelWithDetails extends Label {
    currentValue: number;
    lastMonthValue: number;
    averageValue: number;
}
