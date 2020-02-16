import { Label, LabelWithDetails } from '../../models/label';
import { ConfigurationManager } from '../../../configuration/manager';
import { AppConfig } from '../../../configuration/app-config';
import { IService } from '../service-base';

export class LabelServiceFake implements IService<Label> {
    config: AppConfig = ConfigurationManager.get();
    labels: Label[];
    collection = 'labels';

    constructor() {
        this.labels = JSON.parse(localStorage.getItem(this.collection)) as Label[];
        if (this.labels === null || this.labels.length === 0) {
            this.labels = [
                {
                    id: '1',
                    name: 'Label 1',
                    groupId: '1',
                    currentValue: Math.random() * 100,
                    lastMonthValue: Math.random() * 100,
                    averageValue: Math.random() * 100
                },
                {
                    id: '2',
                    name: 'Label 2',
                    groupId: '1',
                    currentValue: Math.random() * 100,
                    lastMonthValue: Math.random() * 100,
                    averageValue: Math.random() * 100
                },
                {
                    id: '3',
                    name: 'Label 3',
                    groupId: '2',
                    currentValue: Math.random() * 100,
                    lastMonthValue: Math.random() * 100,
                    averageValue: Math.random() * 100
                }
            ] as LabelWithDetails[];
            localStorage.setItem(this.collection, JSON.stringify(this.labels));
        }
    }

    public async getAll(groupId: string): Promise<Label[]> {
        return new Promise(resolve => {
            return setTimeout(() => {
                return resolve(this.labels.filter(x => x.groupId === groupId));
            }, this.config.enableFakeDatabaseTimeout);
        });
    }
    public async getAllWithDetails(groupId: string): Promise<LabelWithDetails[]> {
        return new Promise(resolve => {
            return setTimeout(() => {
                return resolve(this.labels.filter(x => x.groupId === groupId) as LabelWithDetails[]);
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    public async get(id: string): Promise<Label> {
        return new Promise((resolve, reject) => {
            return setTimeout(() => {
                const label = this.labels.find(x => x.id === id);
                if (label === null || label === undefined) {
                    return reject('Does not exist');
                }
                return resolve(label);
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    public async add(obj: Label): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (obj.name.length <= 2) {
                    return reject('Too small');
                }

                const max = Math.max.apply(
                    Math,
                    this.labels.map(x => +x.id)
                );
                this.labels.push({
                    ...obj,
                    id: (max + 1).toString(),
                    currentValue: Math.random() * 100,
                    lastMonthValue: Math.random() * 100,
                    averageValue: Math.random() * 100
                } as LabelWithDetails);
                localStorage.setItem(this.collection, JSON.stringify(this.labels));
                resolve();
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    public async update(obj: Label): Promise<void> {
        return new Promise((resolve, reject) => {
            return setTimeout(() => {
                const label = this.labels.find(x => x.id === obj.id);
                if (label === null || label === undefined) {
                    return reject('Does not exist');
                }
                this.labels = this.labels.filter(x => x.id !== obj.id);
                this.labels.push(obj);
                localStorage.setItem(this.collection, JSON.stringify(this.labels));
                return resolve();
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    public async delete(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            return setTimeout(() => {
                const label = this.labels.find(x => x.id === id);
                if (label === null || label === undefined) {
                    return reject('Does not exist');
                }
                this.labels = this.labels.filter(x => x.id !== id);
                localStorage.setItem(this.collection, JSON.stringify(this.labels));
                return resolve();
            }, this.config.enableFakeDatabaseTimeout);
        });
    }
}
