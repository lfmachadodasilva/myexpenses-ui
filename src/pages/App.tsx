import React, { memo, useState } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import './App.scss';
import { Header } from '../components/header/header';
import { ExpensesPage } from './expenses/expensesPage';
import { ConfigurationManager } from '../configurations/configurationManager';
import { AppConfig } from '../configurations/appConfig';
import { LabelsPage } from './labels/labelsPage';

const Application: React.FC = memo(() => {
    const [config] = useState<AppConfig>(ConfigurationManager.get());

    return (
        <>
            <Header />
            <Container maxWidth="md">
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Switch>
                        <Route path={'/expenses'} component={ExpensesPage} />
                        <Route path={'/labels'} component={LabelsPage} />

                        <Route exact path="/">
                            <>
                                <Typography variant="h3">HOME</Typography>
                                <Typography variant="h6">Build Version: {config.buildVersion}</Typography>
                            </>
                        </Route>
                        <Route path="*">
                            <h1> 404 </h1>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </Container>
        </>
    );
});

export const App = Application;
