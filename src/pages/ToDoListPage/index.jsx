import React, {useEffect, useState} from 'react';
import './index.scss';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DropdownItem from 'react-bootstrap/DropdownItem';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import journals from './img/journals.svg';
import boxArrowRight from './img/box-arrow-right.svg';
import plus from './img/plus.svg';
import checkImg from './img/check-circle.svg';
import pencil from './img/pencil.svg';
import trash from './img/trash.svg';
import threeDot from './img/three-dots-vertical.svg';
import undo from './img/arrow-counterclockwise.svg';
import checkCircle from './img/check-circle-fill.svg';

const colors = [
    'border-danger',
    'border-primary',
    'border-secondary',
    'border-success',
    'border-info',
    'border-warning',
    'border-dark',
];

const CustomToggle = React.forwardRef(({onClick}, ref) => (
    <a
        href=" "
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}>
        <img src={threeDot} alt="three dots" />
    </a>
));

export function ToDoListPage() {
    const [username, setUserName] = useState('');
    const [showSaveToDoModal, setShowSaveToDoModal] = useState(false);
    const [signOutShowModal, setSignOutShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toDoList, setToDoList] = useState([]);
    const [content, setContent] = useState('');
    const [isEditClicked, setEditClicked] = useState(false);
    const [editId, setEditId] = useState(null);

    const handleSaveToDoClose = () => {
        setShowSaveToDoModal(false);
        setContent('');
        setEditId(null);
        setEditClicked(false);
    };
    const handleSaveToDoShow = () => setShowSaveToDoModal(true);
    const handleSignOutClose = () => setSignOutShowModal(false);
    const handleSignOutShow = () => setSignOutShowModal(true);
    const handleDeleteClose = () => setShowDeleteModal(false);
    const handleDeleteShow = () => setShowDeleteModal(true);
    const handleDoneClick = (id, content, isCompleted) => {
        callListPutAPI(id, content, isCompleted);
    };

    useEffect(() => {
        const usernameFromLocalStorage = localStorage.getItem('username');
        setUserName(usernameFromLocalStorage);
    }, []);
    useEffect(() => {
        callListGetAPI();
    }, []);

    function signOut() {
        // navigate('/login', {replace: true})
        localStorage.removeItem('username');
        window.location.reload();
    }

    function callListGetAPI() {
        fetch('https://6315fb1633e540a6d389a78f.mockapi.io/todos').then(res => {
            res.json().then(listFromAPI => {
                setToDoList(listFromAPI);
            });
        });
    }

    function callListPostAPI() {
        fetch('https://6315fb1633e540a6d389a78f.mockapi.io/todos', {
            method: 'POST',
            body: JSON.stringify({
                content: content,
            }),
            headers: {
                'content-type': 'application/json',
            },
        }).then(res => {
            if (res.ok) {
                callListGetAPI();
                handleSaveToDoClose();
                setToastMessage('Saved');
                setShowToast(true);
            }
        });
    }

    function callListDelAPI(id) {
        fetch(`https://6315fb1633e540a6d389a78f.mockapi.io/todos/${id}`, {
            method: 'DELETE',
        }).then(res => {
            if (res.ok) {
                callListGetAPI();
                handleDeleteClose();
                setToastMessage('Deleted');
                setShowToast(true);
            }
        });
    }

    function callListPutAPI(id, content, isCompleted) {
        fetch(`https://6315fb1633e540a6d389a78f.mockapi.io/todos/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                content: content,
                isCompleted: isCompleted,
            }),
            headers: {
                'content-type': 'application/json',
            },
        }).then(res => {
            if (res) {
                callListGetAPI();
                handleSaveToDoClose();
                setToastMessage('Saved');
                setShowToast(true);
            }
        });
    }

    function handleEditClick(id, content) {
        setEditClicked(true);
        setContent(content);
        setEditId(id);
        handleSaveToDoShow();
    }

    function handleSaveClick() {
        if (isEditClicked) {
            callListPutAPI(editId, content, false);
        } else {
            callListPostAPI();
        }
    }

    return (
        <>
            <Navbar className="navbar-color">
                <Container>
                    <NavbarBrand className="text-black">
                        <img
                            src={journals}
                            alt="todo list"
                            width="30"
                            height="30"
                            className="me-2"
                        />
                        To Do List
                    </NavbarBrand>
                    <NavbarCollapse className="justify-content-end">
                        <Navbar.Text className="text-black">
                            Welcome {username}!
                            <Button
                                className="text-black ms-4 sign-button"
                                onClick={handleSignOutShow}>
                                Sign Out
                                <img
                                    src={boxArrowRight}
                                    alt="sign out"
                                    width="30"
                                    height="30"
                                    className="ms-2"
                                />
                            </Button>
                            <Modal
                                show={signOutShowModal}
                                onHide={handleSignOutClose}
                                centered>
                                <Modal.Header
                                    closeButton
                                    className="modal-color">
                                    <Modal.Title>Sign Out</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Are you sure you want to sign out?
                                </Modal.Body>
                                <Modal.Footer className="modal-color">
                                    <Button
                                        variant="primary"
                                        className="border-primary text-white"
                                        onClick={handleSignOutClose}>
                                        Close
                                    </Button>
                                    <Button variant="danger" onClick={signOut}>
                                        Sign Out
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Navbar.Text>
                    </NavbarCollapse>
                </Container>
            </Navbar>
            <div className="d-flex justify-content-center pt-5">
                <div className="w-50 pb-5">
                    <div className="justify-content-end d-flex pb-5  ">
                        <Button
                            className="add-new"
                            onClick={handleSaveToDoShow}>
                            <img src={plus} alt="plus" width="30" height="30" />
                            Add New
                        </Button>
                    </div>
                    <Row xs={1} md={2} className="g-4">
                        {toDoList.map((item, index) => (
                            <Col>
                                <Card
                                    className={`w-100 ${
                                        colors[index % colors.length]
                                    } card mt-2`}>
                                    <Card.Header className="d-flex flex-row justify-content-between">
                                        {index + 1}
                                        <a className="d-flex">
                                            {item.isCompleted ? (
                                                <img
                                                    src={checkCircle}
                                                    alt="Check"
                                                    className="check-icon me-1"
                                                />
                                            ) : null}
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    as={CustomToggle}
                                                />
                                                <Dropdown.Menu>
                                                    {item.isCompleted ? (
                                                        <DropdownItem
                                                            onClick={() =>
                                                                handleDoneClick(
                                                                    item.id,
                                                                    item.content,
                                                                    false,
                                                                )
                                                            }>
                                                            <img
                                                                src={undo}
                                                                alt="undo"
                                                            />{' '}
                                                            Undo done
                                                        </DropdownItem>
                                                    ) : (
                                                        <DropdownItem
                                                            onClick={() =>
                                                                handleDoneClick(
                                                                    item.id,
                                                                    item.content,
                                                                    true,
                                                                )
                                                            }>
                                                            <img
                                                                src={checkImg}
                                                                alt="check"
                                                            />{' '}
                                                            Done
                                                        </DropdownItem>
                                                    )}
                                                    {item.isCompleted ? null : (
                                                        <DropdownItem
                                                            onClick={() =>
                                                                handleEditClick(
                                                                    item.id,
                                                                    item.content,
                                                                )
                                                            }>
                                                            <img
                                                                src={pencil}
                                                                alt="pencil"
                                                            />{' '}
                                                            Edit
                                                        </DropdownItem>
                                                    )}
                                                    <DropdownItem
                                                        onClick={
                                                            handleDeleteShow
                                                        }>
                                                        <img
                                                            src={trash}
                                                            alt="trash"
                                                        />{' '}
                                                        Delete
                                                    </DropdownItem>
                                                    <Modal
                                                        show={showDeleteModal}
                                                        onHide={
                                                            handleDeleteClose
                                                        }
                                                        centered>
                                                        <Modal.Header
                                                            closeButton>
                                                            <Modal.Title>
                                                                Delete{' '}
                                                            </Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            Are you sure you
                                                            want to delete this?
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                            <Button
                                                                variant="primary"
                                                                className="text-white"
                                                                onClick={
                                                                    handleDeleteClose
                                                                }>
                                                                Close
                                                            </Button>
                                                            <Button
                                                                variant="danger"
                                                                onClick={() =>
                                                                    callListDelAPI(
                                                                        item.id,
                                                                    )
                                                                }>
                                                                Delete
                                                            </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </a>
                                    </Card.Header>
                                    <Card.Body
                                        key={item.id}
                                        className={`d-flex flex-row justify-content-between card-body ${
                                            item.isCompleted
                                                ? 'todo-bg-done'
                                                : 'todo-bg-not-done'
                                        }`}>
                                        <div className="white-space-wrap">
                                            {item.content}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
            <Modal
                show={showSaveToDoModal}
                onHide={handleSaveToDoClose}
                size="lg"
                centered>
                <Modal.Header closeButton className="modal-color">
                    <Modal.Title>Add To Do</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Write something...</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                onChange={event =>
                                    setContent(event.target.value)
                                }
                                autoFocus
                                value={content}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="modal-color">
                    <Button
                        variant="primary"
                        onClick={handleSaveToDoClose}
                        className="text-white">
                        Close
                    </Button>
                    <Button
                        disabled={content.length < 3}
                        variant="secondary"
                        onClick={handleSaveClick}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position="bottom-end" containerPosition="fixed">
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={3000}
                    autohide
                    bg="success">
                    <Toast.Header>
                        <img
                            src={journals}
                            className="rounded me-2"
                            alt="List"
                        />
                        <strong className="me-auto">To Do List</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}
