import React, {FC} from 'react';
import {render} from 'react-dom';

interface TProps {

}

export const Popup: FC<TProps> = () => {
    return (
        <div>
            Popup Page
        </div>
    );
}

render(<Popup />, document.getElementById('popup'))