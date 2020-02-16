import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LabelAllPage from './label-all';
import LabelAddEditPage from './label-add-edit';
import { MyRoute } from '../../route';

const LabelPage: React.FC = () => (
    <Switch>
        <Route path={MyRoute.LABEL_ADD} component={LabelAddEditPage} />
        <Route path={MyRoute.LABEL_EDIT} component={LabelAddEditPage} />
        <Route path={MyRoute.LABEL} component={LabelAllPage} />

        <Route path='*'>
            <h1> 404 </h1>
        </Route>
    </Switch>
);

export default LabelPage;
