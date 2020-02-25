import { Group } from '../models/group';

export class LocalStorageHelper {
    static getGroup(groups: Group[]): string {
        if (groups.length === 0) {
            // user does not have any groups
            return '';
        }

        let selectedGroup = localStorage.getItem('group');

        // do not have any selected, select the first available group
        if (
            (selectedGroup === null || selectedGroup === undefined || selectedGroup.length === 0) &&
            groups.length > 0
        ) {
            selectedGroup = groups[0].id;
        }

        // check if the selected group is valid
        if (!groups.some(x => x.id === selectedGroup)) {
            // if is not valid reset and select the first available group
            selectedGroup = groups[0].id;
        }

        // update local storage with the selected
        this.setGroup(selectedGroup);
        return selectedGroup;
    }

    static setGroup(groupId: string) {
        localStorage.setItem('group', groupId);
    }
}
