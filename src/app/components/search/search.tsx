import React from 'react';
import { Form, Col, Row, Button, Container } from 'react-bootstrap';
import './search.scss';
import { Trans } from 'react-i18next';
import { MonthViewModel } from '../../models/viewModels/MonthViewModel';
import { GroupViewModel } from '../../models/viewModels/groupViewModel';

export interface SearchProps {
    group: number;
    month: number;
    year: number;

    search: (group: number, month: number, year: number) => void;
}
export interface SearchState {
    group: number;
    month: number;
    year: number;
}

/**
 * Search component
 */
export class SearchComponent extends React.Component<SearchProps, SearchState> {
    private month = this.getMonths();
    private groups = this.getGroups();

    constructor(props: SearchProps) {
        super(props);

        var today = new Date();
        this.state = {
            group: !isNaN(this.props.group) ? props.group : 1,
            month: !isNaN(this.props.month) ? props.month : today.getMonth() + 1,
            year: !isNaN(this.props.year) ? props.year : today.getFullYear()
        };

        this.handleSearch = this.handleSearch.bind(this);

        this.handleGroup = this.handleGroup.bind(this);
        this.handleMonth = this.handleMonth.bind(this);
        this.handleYear = this.handleYear.bind(this);
    }

    componentDidUpdate() {}

    render(): React.ReactNode {
        return (
            <div className='search' key='searchComponent'>
                <Form>
                    <Container>
                        <Row className='justify-content-md-center justify-content-lg-center'>
                            <Col xs={12} md>
                                <Form.Group as={Col} controlId='formGroup'>
                                    <Form.Label>
                                        <Trans>SEARCH.GROUP</Trans>
                                    </Form.Label>
                                    <Form.Control
                                        as='select'
                                        defaultValue={this.state.group}
                                        onChange={this.handleGroup}
                                    >
                                        {this.groups.map(group => {
                                            return (
                                                <option key={group.id} value={group.id}>
                                                    {group.name}
                                                </option>
                                            );
                                        })}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={12} md>
                                <Form.Group as={Col} controlId='formYear'>
                                    <Form.Label>
                                        <Trans>SEARCH.MONTH</Trans>
                                    </Form.Label>
                                    <Form.Control
                                        as='select'
                                        defaultValue={this.state.month}
                                        onChange={this.handleMonth}
                                    >
                                        {this.month.map(month => {
                                            return (
                                                <option key={month.id} value={month.id}>
                                                    {month.name}
                                                </option>
                                            );
                                        })}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col xs={12} md>
                                <Form.Group as={Col} controlId='formYear'>
                                    <Form.Label>
                                        <Trans>SEARCH.YEAR</Trans>
                                    </Form.Label>
                                    <Form.Control as='select' defaultValue={this.state.year} onChange={this.handleYear}>
                                        {this.getYears().map(year => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant='primary' onClick={this.handleSearch}>
                                    <Trans>SEARCH.SUBMIT</Trans>
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
            </div>
        );
    }

    private getYears(): number[] {
        return [2020, 2019, 2018, 2017];
    }

    private getGroups(): GroupViewModel[] {
        return [
            {
                id: 1,
                name: 'Group 1'
            },
            {
                id: 2,
                name: 'Group 2'
            },
            {
                id: 3,
                name: 'Group 3'
            }
        ];
    }

    private getMonths(): MonthViewModel[] {
        let month = 0;
        return [
            'JANUARY',
            'FEBRUARY',
            'MARCH',
            'APRIL',
            'MAY',
            'JUNE',
            'JULY',
            'AUGUST',
            'SEPTEMBER',
            'OCTOBER',
            'NOVEMBER',
            'DECEMBER'
        ].map(x => {
            return {
                id: ++month,
                name: `SEARCH.MONTHS.${x}`
            } as MonthViewModel;
        });
    }

    private handleSearch() {
        this.props.search(this.state.group, this.state.month, this.state.year);
    }

    private handleGroup(e: any) {
        this.setState({
            group: e.target.value
        });
    }

    private handleMonth(e: any) {
        this.setState({
            month: e.target.value
        });
    }

    private handleYear(e: any) {
        this.setState({
            year: e.target.value
        });
    }
}
