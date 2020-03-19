import { Group } from '../models/group';
import { hasValue } from './util-helper';

export class LocalStorageHelper {
    static getGroup(groups: Group[]): string {
        if (groups.length === 0) {
            // user does not have any groups
            return null;
        }

        const selectedGroup = localStorage.getItem('group');
        let group: Group = groups.find(x => x.id === selectedGroup);

        if (!hasValue(group)) {
            // do not have any selected, select the first available group
            if (!hasValue(selectedGroup) && groups.length > 0) {
                group = groups[0];
            }

            // check if the selected group is valid
            if (!groups.some(x => x.id === selectedGroup)) {
                // if is not valid reset and select the first available group
                group = groups[0];
            }
        }

        // update local storage with the selected
        this.setGroup(group.id);
        return group.id;
    }

    static setGroup(groupId: string) {
        localStorage.setItem('group', groupId);
    }
}
