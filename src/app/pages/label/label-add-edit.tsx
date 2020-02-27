import React, { useState, useMemo, useCallback, useContext, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';

import { LabelService } from '../../services/label/label-service';
import { Label } from '../../models/label';
import { userContext } from '../../contexts/user-context';
import { MyRoute } from '../../route';
import { globalContext } from '../../contexts/global-context';

const LabelAddEditPage: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useContext(userContext);
    const { group, loadingBase, labelReducer } = useContext(globalContext);
    const { resetLabelsWithDetails, resetLabels } = labelReducer;

    const { label } = useParams();
    const isAdd = useRef(label === undefined);

    const history = useHistory();

    const [currentLabel, setCurrentLabel] = useState<Label>(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingLabel, setLoadingLabel] = useState(false);
    const [error, setError] = useState('');
    const disabledButton = useMemo(() => {
        return name === '';
    }, [name]);

    useEffect(() => {
        if (isAdd.current) {
            return;
        }

        setCurrentLabel(null);
        setLoadingLabel(true);
        new LabelService(user)
            .get(label)
            .then(value => {
                setName(value.name);
                setCurrentLabel(value);
            })
            .catch(e => {
                setError(e.toString());
                setCurrentLabel(null);
            })
            .finally(() => {
                setLoadingLabel(false);
            });
    }, [user, isAdd, label]);

    const handleAdd = useCallback(() => {
        setLoading(true);
        new LabelService(user)
            .add({ name: name, groupId: group } as Label)
            .then(() => {
                resetLabels();
                resetLabelsWithDetails();
                history.push(MyRoute.LABEL);
            })
            .catch(e => {
                setError(e.toString());
            })
            .finally(() => {
                setLoading(false);
            });
    }, [history, user, name, group, resetLabelsWithDetails, resetLabels]);

    const handleEdit = useCallback(() => {
        setLoading(true);
        new LabelService(user)
            .update({ ...currentLabel, name: name } as Label)
            .then(() => {
                resetLabels();
                resetLabelsWithDetails();
                history.push(MyRoute.LABEL);
            })
            .catch(e => {
                setError(e.toString());
            })
            .finally(() => {
                setLoading(false);
            });
    }, [history, user, name, currentLabel, resetLabelsWithDetails, resetLabels]);

    const handleCancel = useCallback(() => {
        history.push(MyRoute.LABEL);
    }, [history]);

    return (
        <div className='mt-4'>
            {loadingBase && (
                <Row className='m-4'>
                    <Col style={{ textAlign: 'center' }}>
                        <Spinner animation='border' role='status'>
                            <span className='sr-only'>Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            )}
            {!loadingBase && (
                <Row>
                    <Col sm={12} md={6}>
                        <h4>{t(isAdd.current ? 'LABEL.ADD_EDIT.ADD_TITLE' : 'LABEL.ADD_EDIT.EDIT_TITLE')}</h4>

                        <hr></hr>
                        <Form>
                            <Form.Group controlId='formLabelName'>
                                <Form.Label>{t('LABEL.ADD_EDIT.NAME')}</Form.Label>
                                {!isAdd.current && loadingLabel && (
                                    <>
                                        &nbsp;
                                        <Spinner
                                            as='span'
                                            animation='border'
                                            size='sm'
                                            role='status'
                                            aria-hidden='true'
                                        />
                                        &nbsp;
                                    </>
                                )}
                                <Form.Control
                                    type='text'
                                    placeholder={t('LABEL.ADD_EDIT.NAME_PLACEHOLDER')}
                                    value={name}
                                    onChange={(value: any) => {
                                        setName(value.target.value);
                                    }}
                                    size='sm'
                                    disabled={loading || loadingLabel}
                                />
                            </Form.Group>

                            <Button
                                variant='primary'
                                disabled={disabledButton}
                                onClick={isAdd.current ? handleAdd : handleEdit}
                                size='sm'
                                className='mr-4'
                            >
                                {loading && (
                                    <>
                                        <Spinner
                                            as='span'
                                            animation='border'
                                            role='status'
                                            aria-hidden='true'
                                            size='sm'
                                        />
                                        &nbsp;
                                    </>
                                )}
                                {t(isAdd.current ? 'ADD' : 'EDIT')}
                            </Button>
                            <Button variant='secondary' onClick={handleCancel} size='sm'>
                                {t('CANCEL')}
                            </Button>
                        </Form>

                        {error !== '' && (
                            <Alert key='addError' variant='danger' className='mt-2'>
                                {error}
                            </Alert>
                        )}
                    </Col>
                </Row>
            )}
        </div>
    );
};

export default LabelAddEditPage;
