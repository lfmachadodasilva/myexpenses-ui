import React, { useState } from 'react';
import logo from '../../logo.svg';
import './App.scss';
import { Button, Modal } from 'react-bootstrap';
import { HeaderComponent } from '../components/header/header';

const App: React.FC = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='App'>
            <HeaderComponent />
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
                    Learn React
                </a>
            </header>

            <div className='p-1'>
                <Button variant='primary' className='mr-1'>
                    Primary
                </Button>
                <Button variant='secondary' className='mr-1'>
                    Secondary
                </Button>
                <Button variant='success' className='mr-1'>
                    Success
                </Button>
                <Button variant='warning' className='mr-1'>
                    Warning
                </Button>
                <Button variant='danger' className='mr-1'>
                    Danger
                </Button>
                <Button variant='info' className='mr-1'>
                    Info
                </Button>
                <Button variant='light' className='mr-1'>
                    Light
                </Button>
                <Button variant='dark' className='mr-1'>
                    Dark
                </Button>
                <Button variant='link' className='mr-1'>
                    Link
                </Button>
            </div>

            <>
                <Button variant='primary' onClick={handleShow}>
                    Launch demo modal
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant='primary' onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    );
};

export default App;
