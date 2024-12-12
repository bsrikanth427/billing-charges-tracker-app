// components/ConfirmationModal.js
import React from "react";

const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onCancel} />
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                        <button className="btn btn-primary" onClick={onConfirm}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
