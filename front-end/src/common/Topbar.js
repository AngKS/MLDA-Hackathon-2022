import React, { useState, useEffect } from "react";
import "../styles/topbar.css";
import logo from "../assets/LOGO.png";
import { Link } from 'react-router-dom';

function TopBar({ current_page }) {
    const [currentPage, setCurrentPage] = useState(current_page)

    useEffect(() => {
        if (currentPage === null) {
            setCurrentPage('Chat')
        }
    }, [])

    return (
        <div className="w-3/5 mx-auto h-70 flex justify-between content-center">
            <div className="w-1/4 h-full items-center ">
                <Link to="/" variant="outlined">
                    <button><img src={logo} alt="LOGO" className="logo" /></button></Link>

            </div>
            <div></div>
            <div className="flex h-70 w-1/2 gap-20 items-center justify-end">
                {currentPage === 'Chat' && <div className="text-2xl font-bold purple">
                    <Link to="/" variant="outlined">
                        <button>Chat</button></Link>
                </div>}

                {currentPage !== 'Chat' && <div className="text-2xl">
                    <Link to="/" variant="outlined">
                        <button>Chat</button></Link>
                </div>}

                {currentPage === 'About' && <div className="text-2xl font-bold purple">
                    <Link to="/" variant="outlined">
                        <button>About</button></Link>
                </div>}

                {currentPage !== 'About' && <div className="text-2xl">
                    <Link to="/" variant="outlined">
                        <button>About</button></Link>
                </div>}

                {currentPage === 'Rules' && <div className="text-2xl font-bold purple">
                    <Link to="/" variant="outlined">
                        <button>Rules</button></Link>
                </div>}

                {currentPage !== 'Rules' && <div className="text-2xl">
                    <Link to="/" variant="outlined">
                        <button>Rules</button></Link>
                </div>}
                {/* <div className="text-2xl font-semibold">Services</div> */}
            </div>
        </div>
    )
}

export { TopBar }