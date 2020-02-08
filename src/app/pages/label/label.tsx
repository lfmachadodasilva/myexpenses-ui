import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LabelAllPage from './label-all';

export class LabelPage extends React.Component {
    render(): React.ReactNode {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route path='/label' component={LabelAllPage} exact />
                    {/* <Route path='/label/add' component={LabelAddEditPage} /> */}
                    {/* <Route path='/label/edit/:group/:label/:date' component={LabelAddEditPage} /> */}
                </Switch>
            </BrowserRouter>
        );
    }
}
