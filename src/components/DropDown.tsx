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
            <button className='dropDownFilter' onClick={handleMenu}>
                Filter by<i className="arrow"></i>   
            </button>
                {showMenu ? (
                    <>
                        <input className="checkBox" id="cbox1" type="checkbox"/>
                        <button className='dropDownButton' onClick={onClickAction}>Action Movies</button>
                        <input className="checkBox" id="cbox2" type="checkbox"/>
                        <button className='dropDownButton' onClick={onClickRating}>High Rating</button>
                    </>
                ) : (null)}
        </div>
    );

}


export default DropDown;