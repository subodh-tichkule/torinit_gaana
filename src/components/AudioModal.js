import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AudioModal = (props) => {
    const { params, modalOpen, handleClose } = props;
    return (
        <Modal show={modalOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {params.collectionName}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    <img src={params.artworkUrl100} alt={params.collectionName} width="100%" />
                    <audio autoPlay controls src={params.previewUrl} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
      </Button>

            </Modal.Footer>
        </Modal>

    )
}
export default AudioModal;