import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import queryString from 'query-string';
import { createGlobalStyle } from 'styled-components';

import { BsSearch } from 'react-icons/bs';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import { ButtonComponent } from '../button/button';
import { globalContext } from '../../contexts/global';

export type SearchProps = {};

const SearchStyle = createGlobalStyle`
    .search-component {
        .card-header {
            padding: 5px;
            border: none;
        }
        .card-body {
            padding-top: 0;
            padding-bottom: 0;
            padding-right: 10px;
            padding-left: 10px;
        }
        .search-header {
            margin: 0px;
        }
    }
`;

export const SearchComponent: React.FC<SearchProps> = React.memo((props: SearchProps) => {
    const [t] = useTranslation();
    const history = useHistory();
    const global = useContext(globalContext);

    const [months] = React.useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [group, setGroup] = React.useState<number>(global.group);
    const [month, setMonth] = React.useState<number>(global.month);
    const [year, setYear] = React.useState<number>(global.year);
    const [isExpanded, setExpanded] = React.useState<boolean>(false);

    React.useEffect(() => {
        setGroup(global.group);
        setMonth(global.month);
        setYear(global.year);
    }, [global.group, global.month, global.year]);

    const handleOnChangeGroup = React.useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
        setGroup(event.target.value as number);
    }, []);
    const handleOnChangeMonth = React.useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
        setMonth(event.target.value as number);
    }, []);
    const handleOnChangeYear = React.useCallback((event: React.ChangeEvent<{ value: unknown }>) => {
        setYear(event.target.value as number);
    }, []);

    const handleOnSearch = React.useCallback(() => {
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify({
                group: group,
                month: month,
                year: year
            })
        });
    }, [history, group, month, year]);

    const handleExpandCollapse = React.useCallback(() => {
        setExpanded(!isExpanded);
    }, [isExpanded]);

    const groupsOptions = React.useMemo(
        () =>
            global.groups.map(x => (
                <option key={'GROUP_' + x.id} value={x.id}>
                    {x.name}
                </option>
            )),
        [global.groups]
    );

    const monthsOptions = React.useMemo(
        () =>
            months.map(x => (
                <option key={'MONTH_' + x} value={x}>
                    {t('MONTHS.' + x)}
                </option>
            )),
        [months, t]
    );

    const yearsOptions = React.useMemo(
        () =>
            global.years.map(x => (
                <option key={'YEAR_' + x} value={x}>
                    {x}
                </option>
            )),
        [global.years]
    );

    const headerElement = React.useMemo(() => {
        if (global.isLoading) {
            return (
                <div className="text-center">
                    <Spinner data-testid="search-loading" animation="border" role="status" size="sm">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            );
        }

        if (isExpanded) {
            return (
                <strong>
                    <p className="search-header">{t('SEARCH.HEADER')}</p>
                </strong>
            );
        }

        const selectedGroup = global.groups.find(g => g.id === group);

        return (
            <div className="d-flex justify-content-around">
                <p className="search-header">{selectedGroup?.name}</p>
                <p className="search-header">{t('MONTHS.' + month)}</p>
                <p className="search-header">{year}</p>
            </div>
        );
    }, [isExpanded, global.isLoading, global.groups, group, month, year, t]);

    return (
        <div className="search-component mb-2">
            <SearchStyle />
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Card.Header} eventKey="0" onClick={handleExpandCollapse}>
                            {headerElement}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Row>
                                <Col xs={12} sm={5}>
                                    <Form.Group>
                                        <Form.Label>{t('SEARCH.GROUP')}</Form.Label>
                                        <Form.Control
                                            as="select"
                                            size="sm"
                                            value={group}
                                            onChange={handleOnChangeGroup}
                                        >
                                            {groupsOptions}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={4}>
                                    <Form.Group>
                                        <Form.Label>{t('SEARCH.MONTH')}</Form.Label>
                                        <Form.Control
                                            as="select"
                                            size="sm"
                                            value={month}
                                            onChange={handleOnChangeMonth}
                                        >
                                            {monthsOptions}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={3}>
                                    <Form.Group>
                                        <Form.Label>{t('SEARCH.YEAR')}</Form.Label>
                                        <Form.Control as="select" size="sm" value={year} onChange={handleOnChangeYear}>
                                            {yearsOptions}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-end">
                                <ButtonComponent
                                    size="sm"
                                    className="mb-2"
                                    type="primary"
                                    text={t('SEARCH.ACTION')}
                                    icon={<BsSearch size={12} />}
                                    onClick={handleOnSearch}
                                />
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
});
