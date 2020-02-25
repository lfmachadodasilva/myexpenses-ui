import { ListGroup, Button, Row, Col, Spinner, Badge, Alert, Modal } from 'react-bootstrap';
import React, { useContext, useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { FaPlus, FaEdit, FaRegWindowClose } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import { globalContext } from '../../contexts/global-context';
import SearchComponent from '../../components/search/search';
import { LocalStorageHelper } from '../../helpers/localStorage-helper';
import { LabelService } from '../../services/label/label-service';
import { userContext } from '../../contexts/user-context';
import { FetchStatus } from '../../services/fetch-status';
import { MyRoute } from '../../route';

const LabelAllPage: React.FC = () => {
    const global = useContext(globalContext);
    const { user } = useContext(userContext);
    const { t } = useTranslation();
    const history = useHistory();

    const { group, month, year, labelReducer, loadingBase } = global;

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState('');

    const { state: labelState, getLabelsWithDetails } = labelReducer;
    const { labelsWithDetails: labels } = labelState;
    useEffect(() => {
        if (loadingBase || (labels && labels.status !== FetchStatus.Ready)) {
            return;
        }

        getLabelsWithDetails(group, month, year);
    }, [labels, getLabelsWithDetails, loadingBase, group, month, year]);

    const handleDelete = useCallback(
        (id: string) => {
            let doIt = false;
            setLoadingDelete(id);
            setShowDeleteModal(false);
            new LabelService(user)
                .delete(id)
                .then(() => {
                    console.log('deleted');
                    doIt = true;
                })
                .catch(() => {
                    console.log('delete with error');
                })
                .finally(() => {
                    setLoadingDelete('');
                    if (doIt) {
                        getLabelsWithDetails(group, month, year);
                    }
                });
        },
        [user, getLabelsWithDetails, group, month, year]
    );

    const handleOnCloseDeleteModel = useCallback(() => {
        setShowDeleteModal(false);
        setLoadingDelete('');
    }, []);

    const search = (group: string, month: number, year: number) => {
        LocalStorageHelper.setGroup(group);

        // update global context
        global.group = group;
        global.month = month;
        global.year = year;
    };

    return (
        <div key='LabelAllPage'>
            <SearchComponent search={search} />

            <hr></hr>

            <Button
                variant='primary'
                size='sm'
                disabled={labels.status !== FetchStatus.Loaded}
                onClick={() => {
                    history.push(MyRoute.LABEL_ADD);
                }}
            >
                <FaPlus size={16} />
                &nbsp;
                {t('LABEL.ADD')}
            </Button>

            {labels.status === FetchStatus.Ready && (
                <Alert key='NotLoaded' variant='info' className='mt-4'>
                    {t('LABEL.NOT_LOADED')}
                </Alert>
            )}
            {labels.status === FetchStatus.Loading && (
                <Row className='m-4'>
                    <Col style={{ textAlign: 'center' }}>
                        <Spinner animation='border' role='status'>
                            <span className='sr-only'>Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            )}
            {labels.status === FetchStatus.Loaded && labels.data.length === 0 && (
                <Alert key='EmptyLabel' variant='warning' className='mt-4'>
                    {t('LABEL.EMPTY')}
                </Alert>
            )}
            {labels.status === FetchStatus.Loaded && labels.data && labels.data.length > 0 && (
                <>
                    <ListGroup className='mt-3 mb-3'>
                        {labels.data.map(label => {
                            return (
                                <ListGroup.Item key={JSON.stringify(label)}>
                                    <div className='d-flex justify-content-between'>
                                        <h5>{label.name}</h5>
                                        <div className='d-flex justify-content-end'>
                                            <FaEdit
                                                className='mr-3'
                                                size={16}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => history.push(MyRoute.LABEL + `/${label.id}`)}
                                            />
                                            {loadingDelete === label.id && (
                                                <>
                                                    <Spinner
                                                        as='span'
                                                        animation='border'
                                                        size='sm'
                                                        role='status'
                                                        aria-hidden='true'
                                                    />
                                                </>
                                            )}
                                            {loadingDelete !== label.id && (
                                                <FaRegWindowClose
                                                    size={16}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        setLoadingDelete(label.id);
                                                        setShowDeleteModal(true);
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <hr className='m-1'></hr>

                                    <div className='d-flex justify-content-around'>
                                        <h6 style={{ textAlign: 'center' }}>
                                            {t('LABEL.CURRENT_VALUE')}
                                            <br />
                                            <Badge variant='info'>
                                                {t('CURRENCY') + ' ' + label.currentValue.toFixed(2)}
                                            </Badge>
                                        </h6>
                                        <h6 style={{ textAlign: 'center' }}>
                                            {t('LABEL.LAST_VALUE')}
                                            <br />
                                            <Badge
                                                variant={
                                                    label.currentValue > label.lastMonthValue ? 'danger' : 'success'
                                                }
                                            >
                                                {t('CURRENCY') + ' ' + label.lastMonthValue.toFixed(2)}
                                            </Badge>
                                        </h6>
                                        <h6 style={{ textAlign: 'center' }}>
                                            {t('LABEL.AVERAGE_VALUE')}
                                            <br />
                                            <Badge
                                                variant={label.currentValue > label.averageValue ? 'danger' : 'success'}
                                            >
                                                {t('CURRENCY') + ' ' + label.averageValue.toFixed(2)}
                                            </Badge>
                                        </h6>
                                    </div>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </>
            )}

            <Modal show={showDeleteModal} onHide={handleOnCloseDeleteModel} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{t('ADD_EDIT.DELETE_TITLE')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('ADD_EDIT.DELETE_BODY')}</Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => handleDelete(loadingDelete)}>
                        {t('ADD_EDIT.DELETE')}
                    </Button>
                    <Button variant='secondary' onClick={handleOnCloseDeleteModel}>
                        {t('ADD_EDIT.CANCEL')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default LabelAllPage;
