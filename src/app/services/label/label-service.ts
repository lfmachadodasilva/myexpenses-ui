import { User } from 'firebase/app';
import { Label, LabelWithDetails } from '../../models/label';
import { ConfigurationManager } from '../../../configuration/manager';
import { AppConfig } from '../../../configuration/app-config';
import { LabelServiceFake } from './label-service-fake';
import { LabelServiceFirebase } from './label-service-firebase';
import { IService } from '../service-base';

export class LabelService implements IService<Label> {
    user: User;
    config: AppConfig;

    /**
     * Constructor
     */
    constructor(user: User) {
        this.user = user;
        this.config = ConfigurationManager.get();
    }

    /**
     * Get all labels
     */
    public async getAll(groupId: string): Promise<Label[]> {
        if (this.config.enableFakeDatabase) {
            const service = new LabelServiceFake();
            return service.getAll(groupId);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new LabelServiceFirebase(this.user);
            return service.getAll(groupId);
        }

        return new Promise(resolve => {
            // TODO
            resolve([]);
        });
    }

    /**
     * Get all labels with details
     */
    public async getAllWithDetails(groupId: string): Promise<LabelWithDetails[]> {
        if (this.config.enableFakeDatabase) {
            const service = new LabelServiceFake();
            return service.getAllWithDetails(groupId);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new LabelServiceFirebase(this.user);
            return service.getAllWithDetails(groupId);
        }

        return new Promise(resolve => {
            // TODO
            resolve([]);
        });
    }

    /**
     * Get label
     */
    public async get(id: string): Promise<Label> {
        if (this.config.enableFakeDatabase) {
            const service = new LabelServiceFake();
            return service.get(id);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new LabelServiceFirebase(this.user);
            return service.get(id);
        }

        return new Promise(resolve => {
            // TODO
            resolve(null);
        });
    }

    /**
     * Add label
     */
    public async add(obj: Label): Promise<void> {
        if (this.config.enableFakeDatabase) {
            const service = new LabelServiceFake();
            return service.add(obj);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new LabelServiceFirebase(this.user);
            return service.add(obj);
        }

        return new Promise(resolve => {
            // TODO
            resolve();
        });
    }

    /**
     * Update label
     */
    public async update(obj: Label): Promise<void> {
        if (this.config.enableFakeDatabase) {
            const service = new LabelServiceFake();
            return service.update(obj);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new LabelServiceFirebase(this.user);
            return service.update(obj);
        }

        return new Promise(resolve => {
            // TODO
            resolve();
        });
    }

    /**
     * Delete label
     */
    public async delete(id: string): Promise<void> {
        if (this.config.enableFakeDatabase) {
            const service = new LabelServiceFake();
            return service.delete(id);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new LabelServiceFirebase(this.user);
            return service.delete(id);
        }

        return new Promise(resolve => {
            // TODO
            resolve();
        });
    }
}
