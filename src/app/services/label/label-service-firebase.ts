import { Label } from '../../models/label';
import { User, database } from 'firebase';
import { IService } from '../service-base';

export class LabelServiceFirebase implements IService<Label> {
    collection = 'labels/';
    db: database.Database = database();
    user: User;

    /**
     *
     */
    constructor(user: User) {
        this.user = user;
    }

    public async getAll(groupId: string): Promise<Label[]> {
        // return this.db.ref(this.collection).once("value", (data) => {
        //     return data.
        // });
        // return this.db
        //     .collection(this.collection)
        //     .where('groupId', '==', groupId)
        //     .orderBy('name')
        //     .get()
        //     .then(col => {
        //         const ret = [] as Label[];
        //         col.forEach(data => {
        //             const g = data.data() as Label;
        //             g.id = data.id;
        //             ret.push(g);
        //         });
        //         return ret;
        //     });
        throw new Error('Method not implemented.');
    }

    get(id: string): Promise<Label> {
        throw new Error('Method not implemented.');
    }

    public async add(obj: Label): Promise<void> {
        // return this.db
        //     .collection(this.collection)
        //     .add(label)
        //     .then(() => {})
        //     .catch(() => {});
        throw new Error('Method not implemented.');
    }

    public async update(obj: Label): Promise<void> {
        // return this.db
        //     .collection(this.collection)
        //     .doc(label.id)
        //     .update({
        //         name: label.name
        //     });
        throw new Error('Method not implemented.');
    }

    public async delete(id: string): Promise<void> {
        // return this.db
        //     .collection(this.collection)
        //     .doc(labelId)
        //     .delete();
        throw new Error('Method not implemented.');
    }
}
