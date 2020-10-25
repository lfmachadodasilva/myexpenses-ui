import { LabelFullModel, LabelModel } from '../models/label';

export const labelsMockData: LabelModel[] = [
    { id: 1, name: 'Label 1', groupId: 1 },
    { id: 2, name: 'Label 2', groupId: 1 },
    { id: 3, name: 'Label 3', groupId: 2 },
    { id: 4, name: 'Label 4', groupId: 2 }
];

export const labelsFullMockData: LabelFullModel[] = [
    { id: 1, name: 'Label 1', groupId: 1, currValue: 1.11, lastValue: 5, avgValue: 6.33 },
    { id: 2, name: 'Label 2', groupId: 1, currValue: 2.11, lastValue: 4, avgValue: 5.33 },
    { id: 3, name: 'Label 3', groupId: 2, currValue: 3.11, lastValue: 3, avgValue: 4.33 },
    { id: 4, name: 'Label 4', groupId: 2, currValue: 4.11, lastValue: 2, avgValue: 3.33 }
];
