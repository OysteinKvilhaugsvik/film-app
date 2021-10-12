import React, { useState } from 'react';

export function DropDown({ onClickRating, onClickAction }: { onClickRating: any, onClickAction: any }) {

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
                        <button className='dropDownButton' onClick={onClickRating}> High Rating</button>
                        <button className='dropDownButton' onClick={onClickAction}> Action movies</button>
                    </div>
                ) : (null)}
        </div>
    );

}


export default DropDown;