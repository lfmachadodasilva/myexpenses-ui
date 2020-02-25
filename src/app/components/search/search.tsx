import React, { useState, useEffect, useMemo } from 'react';
import { Form, Col, Row, Spinner, Card, Button, Accordion, Badge } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';

import { useTranslation } from 'react-i18next';
import { FetchStatus } from '../../services/fetch-status';
import { FaSearch } from 'react-icons/fa';
import { FetchData } from '../../services/fetch-data';
import { Group } from '../../models/group';
import { hasValue } from '../../helpers/util-helper';

export interface SearchProps {
    group: string;
    groups: FetchData<Group[]>;
    month: number;
    year: number;
    years: FetchData<number[]>;

    onSearch: (group: string, month: number, year: number) => void;
}

/**
 * Search component
 */
const SearchComponent: React.FC<SearchProps> = (props: SearchProps) => {
    const { t } = useTranslation();
    const { group, groups, month, year, years } = props;

    const [groupSelected, setGroupSelected] = useState(group);
    const [monthSelected, setMonthSelected] = useState(month);
    const [yearSelected, setYearSelected] = useState(year);
    const [collapse, setCollpase] = useState(isMobile);

    const groupName = useMemo(() => {
        if (groups.status === FetchStatus.Loaded) {
            const groupDetail = groups.data.find(group => group.id === groupSelected);
            if (hasValue(groupDetail)) {
                return groupDetail.name;
            }
        }
        return '';
    }, [groupSelected, groups]);

    useEffect(() => {
        setGroupSelected(group);
        setMonthSelected(month);
        setYearSelected(year);
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
                        onClick={() => setCollpase(!collapse)}
                        className='p-2'
                    >
                        {!collapse && <h6 className='m-0'>{t('SEARCH.TITLE')}</h6>}
                        {collapse && (
                            <div className='d-flex justify-content-around'>
                                {showLoading(groups.status)}
                                {groups.status === FetchStatus.Loaded && (
                                    <h5 className='mb-0'>
                                        <Badge variant='secondary'>{groupName}</Badge>
                                    </h5>
                                )}

                                {loadingGroupOrYear && showLoading()}

                                {!loadingGroupOrYear && (
                                    <h5 className='mb-0'>
                                        <Badge variant='secondary'>{t('SEARCH.MONTHS.' + monthSelected)}</Badge>
                                    </h5>
                                )}

                                {loadingGroupOrYear && showLoading()}
                                {!loadingGroupOrYear && (
                                    <h5 className='mb-0'>
                                        <Badge variant='secondary'>{yearSelected}</Badge>
                                    </h5>
                                )}
                            </div>
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
                                            value={groupSelected}
                                            disabled={groups.status !== FetchStatus.Loaded}
                                            onChange={(value: any) => {
                                                setGroupSelected(value.target.value);
                                            }}
                                            size='sm'
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
                                                setMonthSelected(+value.target.value);
                                            }}
                                            size='sm'
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
                                                setYearSelected(+value.target.value);
                                            }}
                                            size='sm'
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
                                        onClick={() => props.onSearch(groupSelected, monthSelected, yearSelected)}
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
