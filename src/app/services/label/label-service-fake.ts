import { Label, LabelWithDetails } from '../../models/label';
import { ConfigurationManager } from '../../../configuration/manager';
import { AppConfig } from '../../../configuration/app-config';
import { IService } from '../service-base';
import { hasValue } from '../../helpers/util-helper';

export class LabelServiceFake implements IService<Label> {
    config: AppConfig = ConfigurationManager.get();
    labels: Label[];
    collection = 'labels';

    constructor() {
        this.labels = JSON.parse(localStorage.getItem(this.collection)) as Label[];
        if (!hasValue(this.labels)) {
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

    async getAll(groupId: string): Promise<Label[]> {
        return new Promise(resolve => {
            return setTimeout(() => {
                return resolve(this.labels.filter(x => x.groupId === groupId));
            }, this.config.enableFakeDatabaseTimeout);
        });
    }
    async getAllWithDetails(groupId: string): Promise<LabelWithDetails[]> {
        return new Promise(resolve => {
            return setTimeout(() => {
                return resolve(this.labels.filter(x => x.groupId === groupId) as LabelWithDetails[]);
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    async get(id: string): Promise<Label> {
        return new Promise((resolve, reject) => {
            return setTimeout(() => {
                const label = this.labels.find(x => x.id === id);
                if (!hasValue(label)) {
                    return reject('Does not exist');
                }
                return resolve(label);
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    async add(obj: Label): Promise<void> {
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

    async update(obj: Label): Promise<void> {
        return new Promise((resolve, reject) => {
            return setTimeout(() => {
                const label = this.labels.find(x => x.id === obj.id);
                if (!hasValue(label)) {
                    return reject('Does not exist');
                }
                this.labels = this.labels.filter(x => x.id !== obj.id);
                this.labels.push(obj);
                localStorage.setItem(this.collection, JSON.stringify(this.labels));
                return resolve();
            }, this.config.enableFakeDatabaseTimeout);
        });
    }

    async delete(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            return setTimeout(() => {
                const label = this.labels.find(x => x.id === id);
                if (!hasValue(label)) {
                    return reject('Does not exist');
                }
                this.labels = this.labels.filter(x => x.id !== id);
                localStorage.setItem(this.collection, JSON.stringify(this.labels));
                return resolve();
            }, this.config.enableFakeDatabaseTimeout);
        });
    }
}
