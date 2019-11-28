import { ServiceBase } from './serviceBase';
import { ILabelDto, ILabelWithValuesDto, ILabelToAddDto } from '../models/dtos/labelDto';

/**
 * Label service
 */
export class LabelService extends ServiceBase {
    /**
     * Get all labels
     */
    public async getAllLabels(): Promise<ILabelDto[]> {
        const results = [] as ILabelDto[];
        return results;
    }

    /**
     * Get all labels with values
     */
    public async getAllLabelsWithValues(): Promise<ILabelWithValuesDto[]> {
        const results = [] as ILabelWithValuesDto[];
        return results;
    }

    /**
     * Add label
     */
    public async addLabel(label: ILabelToAddDto): Promise<ILabelDto> {
        const result = {} as ILabelDto;
        return result;
    }

    /**
     * Update label
     */
    public async updateLabel(label: ILabelDto): Promise<ILabelDto> {
        const result = {} as ILabelDto;
        return result;
    }

    /**
     * Delete label
     */
    public async deleteLabel(labelId: number): Promise<boolean> {
        const result = true;
        return result;
    }
}