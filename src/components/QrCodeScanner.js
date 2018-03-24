import React from 'react';
import TextField from 'material-ui/TextField';

const QrCodeScanner = props => (
    <div>
        <TextField
            value={props.text}
            onChange={props.onTextChange}
            floatingLabelText="Text to transform"
        />
    </div>
);

export default QrCodeScanner;