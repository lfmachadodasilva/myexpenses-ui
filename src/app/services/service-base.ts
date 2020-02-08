export interface IService<T> {
    getAll(groupId: string): Promise<T[]>;
    get(id: string): Promise<T>;
    add(obj: T): Promise<void>;
    update(obj: T): Promise<void>;
    delete(id: string): Promise<void>;
}
