import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Form, Col, Row, Spinner, Card, Button, Accordion, Badge } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';

import { useTranslation } from 'react-i18next';
import { globalContext } from '../../contexts/global-context';
import { FetchStatus } from '../../services/fetch-status';
import { FaSearch } from 'react-icons/fa';

export interface SearchProps {
    search: (group: string, month: number, year: number) => void;
}

/**
 * Search component
 */
const SearchComponent: React.FC<SearchProps> = (props: SearchProps) => {
    const { group, month, year, groupReducer, expenseReducer } = useContext(globalContext);
    const { t } = useTranslation();

    const [groupSelected, setGroup] = useState(group);
    const [monthSelected, setMonth] = useState(month);
    const [yearSelected, setYear] = useState(year);
    const [collapse, setCollpase] = useState(isMobile);

    const { groups } = groupReducer.state;
    const { years } = expenseReducer.state;

    const groupName = useMemo(() => {
        if (groups.status === FetchStatus.Loaded) {
            const g = groups.data.find(x => x.id === groupSelected);
            if (g !== null && g !== undefined) {
                return g.name;
            }
        }
        return '';
    }, [groupSelected, groups]);

    useEffect(() => {
        setGroup(group);
        setMonth(month);
        setYear(year);
    }, [group, month, year]);

    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    const showLoading = (status: FetchStatus = FetchStatus.Loading): JSX.Element => {
        return (
            status === FetchStatus.Loading && (
                <>
                    &nbsp;
                    <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                    &nbsp;
                </>
            )
        );
    };

    const loadingGroupOrYear = groups.status === FetchStatus.Loading || years.status === FetchStatus.Loading;

    return (
        <div className='search mt-4 mb-4' key='searchComponent'>
            <Accordion defaultActiveKey={isMobile ? '1' : '0'}>
                <Card>
                    <Accordion.Toggle
                        as={Card.Header}
                        eventKey='0'
                        onClick={() => {
                            setCollpase(!collapse);
                        }}
                    >
                        {!collapse && t('SEARCH.TITLE')}
                        {collapse && (
                            <>
                                <Row>
                                    <Col xs={4}>
                                        {showLoading(groups.status)}
                                        {groups.status === FetchStatus.Loaded && (
                                            <h5 className='mb-0'>
                                                <Badge variant='secondary'>{groupName}</Badge>
                                            </h5>
                                        )}
                                    </Col>
                                    <Col style={{ textAlign: 'center' }} xs={4}>
                                        {loadingGroupOrYear && showLoading()}

                                        {!loadingGroupOrYear && (
                                            <h5 className='mb-0'>
                                                <Badge variant='secondary'>{t('SEARCH.MONTHS.' + monthSelected)}</Badge>
                                            </h5>
                                        )}
                                    </Col>
                                    <Col style={{ textAlign: 'right' }} xs={4}>
                                        {loadingGroupOrYear && showLoading()}
                                        {!loadingGroupOrYear && (
                                            <h5 className='mb-0'>
                                                <Badge variant='secondary'>{yearSelected}</Badge>
                                            </h5>
                                        )}
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey='0' className='p-2'>
                        <Form>
                            <Row>
                                <Col className='p-0' xs={12} sm={4}>
                                    <Form.Group as={Col} controlId='formGroup'>
                                        <Form.Label>{t('SEARCH.GROUP')}</Form.Label>
                                        {showLoading(groups.status)}
                                        <Form.Control
                                            as='select'
                                            defaultValue={groupSelected}
                                            disabled={groups.status !== FetchStatus.Loaded}
                                            onChange={(value: any) => {
                                                setGroup(value.target.value);
                                            }}
                                        >
                                            {groups.status === FetchStatus.Loaded &&
                                                groups.data &&
                                                groups.data.map(group => {
                                                    return (
                                                        <option key={group.id} value={group.id}>
                                                            {group.name}
                                                        </option>
                                                    );
                                                })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className='p-0' xs={12} sm={4}>
                                    <Form.Group as={Col} controlId='formMonth'>
                                        <Form.Label>{t('SEARCH.MONTH')} </Form.Label>
                                        {loadingGroupOrYear && showLoading()}
                                        <Form.Control
                                            as='select'
                                            defaultValue={monthSelected}
                                            disabled={loadingGroupOrYear}
                                            onChange={(value: any) => {
                                                setMonth(+value.target.value);
                                            }}
                                        >
                                            {months.map(month => {
                                                return (
                                                    <option key={month} value={month}>
                                                        {t('SEARCH.MONTHS.' + month)}
                                                    </option>
                                                );
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className='p-0' xs={12} sm={4}>
                                    <Form.Group as={Col} controlId='formYear'>
                                        <Form.Label>{t('SEARCH.YEAR')}</Form.Label>
                                        {loadingGroupOrYear && showLoading()}
                                        <Form.Control
                                            as='select'
                                            defaultValue={yearSelected}
                                            disabled={loadingGroupOrYear}
                                            onChange={(value: any) => {
                                                setYear(+value.target.value);
                                            }}
                                        >
                                            {years.status === FetchStatus.Loaded &&
                                                years.data &&
                                                years.data.map(year => {
                                                    return (
                                                        <option key={year} value={year}>
                                                            {year}
                                                        </option>
                                                    );
                                                })}
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        variant='primary'
                                        size='sm'
                                        onClick={() => {
                                            props.search(groupSelected, monthSelected, yearSelected);
                                        }}
                                    >
                                        <FaSearch size={16} />
                                        &nbsp;
                                        {t('SEARCH.SEARCH')}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
};

export default SearchComponent;
