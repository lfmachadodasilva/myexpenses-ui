import React from 'react';
import { LabelAddEditPage } from './labelAddEdit';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LabelAllPage } from './labelAll';

export class LabelPage extends React.Component {
    render(): React.ReactNode {
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <h1> Label Page </h1>
                <Switch>
                    <Route path='/label' component={LabelAllPage} exact />
                    <Route path='/label/add' component={LabelAddEditPage} />
                    <Route path='/label/edit/:group/:label/:date' component={LabelAddEditPage} />
                </Switch>
            </BrowserRouter>
        );
    }
}
