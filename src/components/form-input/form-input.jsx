import React from 'react';
import './form-input.scss';

const FormInput = ({label, value, errorMsg, ...otherProps}) => (
    <div className="input-group">
        <input className="form-input" value={value} {...otherProps} />
        {
            label ?
            <label className={`${value.length ? 'shrink' : ''} form-input-label`}>
                {label}
            </label>
            : null
        }
        <div className="error">{errorMsg}</div>
    </div>
)

export default FormInput;