import React from 'react';
import PropTypes from 'prop-types';

import {  Form } from 'react-bootstrap';

const InputFieldGroup = ({
    label,
    type,
    placeholder,
    onChange,
    onBlur,
    value,
    error
}) => {
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control 
                type={type} 
                placeholder={placeholder} 
                onChange={onChange} 
                onBlur={onBlur} 
                value={value}
            />
            {error && (
                <Form.Text className="text-danger">
                    {error}
                </Form.Text>
            )}
        </Form.Group>
    )
}

InputFieldGroup.defaultProps = {
    label: 'Label',
    type: 'text',
    placeholder: 'Placeholder',
    note: null
  };
  
  InputFieldGroup.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    note: PropTypes.string,
  };
  
export default InputFieldGroup;