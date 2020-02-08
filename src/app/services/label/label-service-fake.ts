import { Label } from '../../models/label';
import { ConfigurationManager } from '../../../configuration/manager';
import { AppConfig } from '../../../configuration/app-config';
import { IService } from '../service-base';

export class LabelServiceFake implements IService<Label> {
    config: AppConfig = ConfigurationManager.get();

    public async getAll(groupId: string): Promise<Label[]> {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        id: '1',
                        name: 'Label 1',
                        groupId: groupId
                    },
                    {
                        id: '2',
                        name: 'Label 2',
                        groupId: groupId
                    },
                    {
                        id: '3',
                        name: 'Label 3',
                        groupId: groupId
                    }
                ] as Label[]);
            }, this.config.enableFakeDatabaseTimeout);
        });
    }
    get(id: string): Promise<Label> {
        throw new Error('Method not implemented.');
    }
    public async add(obj: Label): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async update(obj: Label): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
