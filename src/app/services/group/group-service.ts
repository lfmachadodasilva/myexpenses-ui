import { User } from 'firebase';
import { Group } from '../../models/group';
import { IService } from '../service-base';
import { AppConfig } from '../../../configuration/app-config';
import { ConfigurationManager } from '../../../configuration/manager';
import { GroupServiceFake } from './group-service-fake';
import { GroupServiceFirebase } from './group-service-firebase';

export class GroupService implements IService<Group> {
    user: User;
    config: AppConfig;

    /**
     * Constructor
     */
    constructor(user: User) {
        this.user = user;
        this.config = ConfigurationManager.get();
    }

    getAll(groupId: string = ''): Promise<Group[]> {
        if (this.config.enableFakeDatabase) {
            const service = new GroupServiceFake();
            return service.getAll(groupId);
        } else if (this.config.enableFirebaseDatabase) {
            const service = new GroupServiceFirebase(this.user);
            return service.getAll(groupId);
        }

        return new Promise(resolve => {
            // TODO
            resolve([]);
        });
    }
    get(id: string): Promise<Group> {
        throw new Error('Method not implemented.');
    }
    add(obj: Group): Promise<void> {
        throw new Error('Method not implemented.');
    }
    update(obj: Group): Promise<void> {
        throw new Error('Method not implemented.');
    }
    delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    // /**
    //  * Get all groups
    //  */
    // public async getAll(): Promise<Group[]> {
    //     // // Add a second document with a generated ID.
    //     // db.collection('users')
    //     //     .add({
    //     //         first: 'Alan',
    //     //         middle: 'Mathison',
    //     //         last: 'Turing',
    //     //         born: 1912
    //     //     })
    //     //     .then(function(docRef) {
    //     //         console.log('Document written with ID: ', docRef.id);
    //     //         db.collection('users')
    //     //             .get()
    //     //             .then(querySnapshot => {
    //     //                 querySnapshot.forEach(doc => {
    //     //                     console.log(`${doc.id} => ${doc.data()}`);
    //     //                 });
    //     //             });
    //     //     })
    //     //     .catch(function(error) {
    //     //         console.error('Error adding document: ', error);
    //     //     });

    //     // const a = await db.collection('groups').get();
    //     // a.forEach(x => {
    //     //     a.forEach(y => console.log(y.id, y.data()));
    //     //     // console.log(x.data, x.id, x.get);
    //     // });

    //     // for (let i = 0; i < 10000; i++) {
    //     //     const id = Math.random() * 10000;
    //     //     this.db
    //     //         .collection('groups')
    //     //         .add({
    //     //             name: 'Group ' + id
    //     //         })
    //     //         .then(x => {
    //     //             console.log(x.id);
    //     //         })
    //     //         .catch(x => {
    //     //             console.log(x);
    //     //         });
    //     // }

    //     // db.collection('groups')
    //     //     .get()
    //     //     .then(x => {
    //     //         x..forEach(y => console.log(y.id, y.data()));
    //     //     });

    //     // return new Promise(resolve => {
    //     //     const results = [
    //     //         {
    //     //             id: 1,
    //     //             name: 'Group 1'
    //     //         },
    //     //         {
    //     //             id: 2,
    //     //             name: 'Group 2'
    //     //         },
    //     //         {
    //     //             id: 3,
    //     //             name: 'Group 3'
    //     //         }
    //     //     ] as Group[];
    //     //     resolve(results);
    //     // });

    //     // db.collection('groups').onSnapshot(x => {
    //     //     x.forEach(y => console.log(y.id, y.data()));
    //     // });

    //     return this.db
    //         .collection(this.collection)
    //         .orderBy('name')
    //         .get()
    //         .then(groups => {
    //             const ret = [] as Group[];

    //             groups.forEach(group => {
    //                 const g = group.data() as Group;
    //                 g.id = group.id;
    //                 ret.push(g);
    //             });

    //             return ret;
    //         });

    //     // const groupsDb = await db
    //     //     .collection('groups')
    //     //     .orderBy('name')
    //     //     .get();

    //     // const groups = [] as Group[];
    //     // groupsDb.forEach(x => {
    //     //     groups.push({
    //     //         id: x.id,
    //     //         name: x.data().name
    //     //     });
    //     // });

    //     // return groups;
    // }
}
