import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { MyRoute } from '../../route';
import GroupAddEditPage from './group-add-edit';
import GroupAllPage from './group-all';

const GroupPage: React.FC = () => (
    <Switch>
        <Route path={MyRoute.GROUP_ADD} component={GroupAddEditPage} />
        <Route path={MyRoute.GROUP_EDIT} component={GroupAddEditPage} />
        <Route path={MyRoute.GROUP} component={GroupAllPage} />

        <Route path='*'>
            <h1> 404 </h1>
        </Route>
    </Switch>
);

export default GroupPage;
