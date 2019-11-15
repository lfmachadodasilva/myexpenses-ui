export interface ILabelDto {
  id: number;
  name: string;

  groupId: number;
}

export interface ILabelWithValuesDto extends ILabelDto {
  lastValue: number;
  currentValue: number;
  averangeValue: number;
}

export interface ILabelToAddDto {
  id: number;
  name: string;
}
