import React from 'react';
import { SearchComponent } from '../../components/search/search';
import queryString from 'query-string';
import { RouteComponentProps } from 'react-router-dom';

export interface ExpenseAllPageProps extends RouteComponentProps {}

export interface ExpenseAllPageState {
    group: number;
    month: number;
    year: number;
}

export class ExpenseAllPage extends React.Component<ExpenseAllPageProps, ExpenseAllPageState> {
    constructor(props: ExpenseAllPageProps & RouteComponentProps) {
        super(props);

        let params = queryString.parse(this.props.location.search);
        this.state = {
            group: isNaN(+params.group) ? undefined : +params.group,
            month: isNaN(+params.month) ? undefined : +params.month,
            year: isNaN(+params.year) ? undefined : +params.year
        };

        this.search = this.search.bind(this);
    }

    componentDidMount() {
        console.log('componentWillMount', this.props, this.state);
    }

    componentDidUpdate() {
        console.log('componentDidUpdate', this.props, this.state);
    }

    shouldComponentUpdate(_nextProps: ExpenseAllPageProps, nextState: ExpenseAllPageState) {
        console.log('shouldComponentUpdate', this.state, nextState);
        return (
            nextState.group !== this.state.group ||
            nextState.month !== this.state.month ||
            nextState.year !== this.state.year
        );
    }

    render(): React.ReactNode {
        let params = queryString.parse(this.props.location.search);
        console.log('render', this.props, this.state, params);
        return (
            <div key='expenseAllPage'>
                <SearchComponent
                    group={this.state.group}
                    month={this.state.month}
                    year={this.state.year}
                    search={this.search}
                />
                <h1> Expense All Page </h1>
            </div>
        );
    }

    private search(group: number, month: number, year: number) {
        this.setState(
            {
                group,
                month,
                year
            },
            () => {
                this.props.history.push({
                    pathname: this.props.history.location.pathname,
                    search: `?group=${this.state.group}&month=${this.state.month}&year=${this.state.year}`
                });
            }
        );
    }
}
