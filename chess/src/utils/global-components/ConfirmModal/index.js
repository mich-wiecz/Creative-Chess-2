import React from 'react';
import UserOptions from '@global-components/UserOptions';
import Button from 'react-bootstrap/Button';


export default function ConfirmModal({
    onYes,
    onClose,
    ...props
}) {
    return (
        <UserOptions.Modal
        className="mt-5"
        size="sm"
        title="Czy na pewno chcesz to zrobić?"
        centered={false}
        {...props}
        >
            <UserOptions.Option>
                <Button onClick={onYes} className="w-100">Tak</Button>
            </UserOptions.Option>
            <UserOptions.Option>
                <Button onClick={onClose} className="w-100">Jednak nie</Button>
            </UserOptions.Option>
        </UserOptions.Modal>
    )
}
