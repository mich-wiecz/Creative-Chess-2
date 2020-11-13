import React from 'react';
import {rulesUrls} from 'data.json';

export default function Rules({mode}) {
    return (
        <iframe 
        style={{
          width: '100%',
          height: '100%',
        }}
        src={rulesUrls[mode]} 
        title="Zasady gry w szachy klasyczne"
        />
    )
}
