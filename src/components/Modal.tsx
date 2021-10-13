import React, { useState } from "react";

export function Modal({children} : {children: any}) {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        if (showModal) { setShowModal(false) }
        else { setShowModal(true) };
    }
        return (
            <div className="modal">
                {showModal ? (
                    <div>
                        <button onClick={handleClose}>Close</button>
                        {console.log(React.Children)}
                        {React.Children}
                    </div>
                ) : (null)}
            </div> 
          );
  

}