import React from 'react';
import QrReader from 'react-qr-scanner';

import '../css/QrCodeScanner.css';

const delay = 100;

const previewStyle = {
    maxHeight: "50%",
    maxWidth: "90%",
    display: "initial",
    padding: "1%"
};

const QrCodeScanner = props => (
    <div className="QrCodeScanner">
        <QrReader
            delay={delay}
            style={previewStyle}
            // legacyMode={true}
            maxImageSize={300}
            onError={props.onQrError}
            onScan={props.onQrScan}
        />
    </div>
);

export default QrCodeScanner;