import React, { useState } from 'react';
import { IDropDown } from '../services/Interface'


export function DropDown({ onClickAction, onClickRating }: IDropDown ) {

    const [showMenu, setShowMenu] = useState(false);

    const handleMenu = () => {
        if (showMenu) { setShowMenu(false) }
        else { setShowMenu(true) };
    }

    return (
        <div className='dropDown'>
            <button className='dropDownButton' onClick={handleMenu}>
                Filter by
            </button>
                {showMenu ? (
                    <div>
                        <button className='dropDownButton' onClick={onClickAction}>Action Movies</button>
                        <button className='dropDownButton' onClick={onClickRating}>High Rating</button>
                    </div>
                ) : (null)}
        </div>
    );

}


export default DropDown;