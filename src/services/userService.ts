import { ServiceBase } from './serviceBase';
import { AppConfig } from '../configurations/appConfig';
import { UserModel } from '../models/userModel';

export class UserService extends ServiceBase {
    constructor(protected config: AppConfig) {
        super(config);
    }

    async addOrUpdate(user: UserModel): Promise<UserModel> {
        return await this.post<UserModel>('/api/user', user);
    }
}
