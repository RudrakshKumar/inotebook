import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import inote from "./inote.png"
import logout from "./logout.png"
import ConfirmDialog from './ComfirmDialog';
import plus from './plus.png'
import AddNote from './AddNote';


const Navbar = (props) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate();
    let location = useLocation();
    const refCloseAdd = useRef(null)
    const {showAlert} = props;
    const onClick = () => {
        setIsDialogOpen(true);
    }
    const handleConfirm = () => {
        localStorage.removeItem('token');
        navigate('/');
        showAlert('Logged Out', 'success')
        setIsDialogOpen(false);
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
    };
    return (
        <div className={`d-${(location.pathname === "/" || location.pathname === "/signup") ? "none" : ""}`}>
            <nav className="navbar navbar-expand-lg fixed-top ">
                <div className="container-fluid">
                    <img className="mx-2"src={inote} alt="" width="70px" height="70px" />
                    <p className="navbar-brand mx-2" style={{ fontFamily: "cursive", fontSize: "35px", color: "black" }}>i N o t e B o o k</p>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className='ms-auto '>

                        <button type="button" className="addNotebtn btn " data-bs-toggle="modal" data-bs-target="#example1Modal" >
                            <img  className='addimg' src={plus} alt="Edit" width="100px" height="60px" />
                        </button>
                        <img onClick={onClick} className=" logout " src={logout} alt="" width="90px" height="70px" />
                        
                        </div>

                    </div>
                </div>
            </nav>
            <ConfirmDialog
                isOpen={isDialogOpen} 
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                message="Are you sure you want to log out?"
            />

            {/* modal for add note  */}

            <div className="modal fade" id="example1Modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" >
                        <div className="modal-header" >
                            <h1 >Add Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <AddNote inputRef={refCloseAdd} showAlert={showAlert} />

                        <button type="button" ref={refCloseAdd} className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
