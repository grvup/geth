import React, { useEffect, useState, useRef, useContext } from "react";
import './userprofile.css'
import logo from "./getH-logos_black.png";
import logo2 from "./component/profile_img.jpg"
import logo3 from "./component/profile-user.png"
import logo4 from "./component/settings.png"
import logo5 from "./component/question.png"
import logo6 from "./component/logout.png"
import logo7 from "./component/arrow-right.png"
import logo13 from "./component/edit.png"
import logo14 from "./component/arrow-down.png"
import logo8 from "./component/clear.png"
import logof from './component/feedback.png'
import logo9 from "./component/menu-bar.png"
import { useLocation, Link } from 'react-router-dom';
import axios from "axios";
import { useData } from './DataContext';
import { UserAuth } from './AuthContext';

export default function UserProfile() {
    const [lastname, setLastname] = useState(' ')
    const [firstname, setFirstname] = useState(' ')
    const [mobilenumber, setMobile] = useState(' ')
    const [e_mail, setE_mail] = useState(' ')
    const [occupation, setOccupation] = useState(' ')
    const [gender, setGender] = useState(' ')
    const { logOut, user } = UserAuth();
    const [selectedImage, setSelectedImage] = useState(user?.photoURL);
    const { userData, deleteUserData, data, fetchData } = useData();
    const { email, username } = userData;
    const fileInputRef = useRef(null);

 
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const handleImageChange = async (event) => {
        // event.preventDefault()
        const file = event.target.files[0];
        // setFile(event.target.value[0]
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
        setisExpandedimgmenu(!isExpandedimgmenu)
        try {
            const formData = new FormData();
            formData.append("file", file);
            // for (var key of formData.entries()) {
            //     console.log(key[0] + ', ' + key[1])
            // }
            // console.log(file)
            const res = await axios.post(`http://localhost:8000/uploadimg/${username}`, formData);
            setUploadSuccess(true);
        } catch (err) {
            console.error("Error submitting the form:", err);
        }
    };
    useEffect(() => {
        if (username) {
            fetchData();
           }
    }, [uploadSuccess]);
    // console.log(data)

    let image = username? data ? data.image : '' : '';
    let Name =  username ? data ? data.firstname : '':' ';
    let imagepath = image || 'default.jpg'
    imagepath = process.env.PUBLIC_URL + '/upload/' + imagepath
    let name = Name || "User"

    const [phoneError, setPhoneError] = useState("");
    const handleChangeNumber = (e) => {
        setMobile(e.target.value)
        const phoneNumber = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        if (phoneNumber.length !== 10) {
            setPhoneError("Phone number must be 10 digits.");
        } else {
            setPhoneError("");
        }
    }
    // console.log(mobilenumber)
    const handleRemoveImage = () => {
        setSelectedImage(user?.photoURL);
        setisExpandedimgmenu(!isExpandedimgmenu)
        fileInputRef.current.value = '';
        console.log(1)
    };
    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };
    async function submit(e) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/userprofile", {
                firstname, lastname, mobilenumber, e_mail, occupation, gender, username
            })
        }
        catch (e) {
            console.log(e);
        }
    }



    // const location = useLocation()
    const [isExpanded, setisExpanded] = React.useState(true)
    function navTgl() {
        setisExpanded(!isExpanded)
    }

    const [isExpandedmenu, setisExpandedmenu] = React.useState(false)
    function navTggl() {
        setisExpandedmenu(!isExpandedmenu)
    }

    const [isExpandedimgmenu, setisExpandedimgmenu] = React.useState(false)
    function menuTggl() {
        setisExpandedimgmenu(!isExpandedimgmenu)
    }

    const [isExpandedsidebar, setisExpandedsidebar] = React.useState(false)
    const [isExpandedbtn, setisExpandedbtn] = React.useState(true)
    function sideTggl() {
        setisExpandedsidebar(!isExpandedsidebar)
        setisExpandedbtn(!isExpandedbtn)
    }



    return (

        <div className="DIV">
            <header>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
                />
                <nav className="navbar">

                    <div className="nav-header">
                        <div className="logo">
                            <img src={logo} alt="Your Logo" />
                        </div>
                        <button className="nav-toggle" onClick={navTgl}>  <i class="fas fa-bars"></i></button>
                    </div>

                    <ul className={isExpanded ? "nav-links" : "show-navbar"}>
                        <li><a href="/">Home</a></li>
                        <li><Link to="/hireworkers" >Hire Workers</Link></li>
                        <li><Link to="/contact" >Contact Us</Link></li>
                        <div className="user-cred">
                            {user !== null ?
                                <p >{user?.displayName} </p>
                                :
                                email === '' ?
                                    <div className="user-cred">
                                        <Link to="/login" >Login</Link>
                                        <a href=" " className="slas">/ </a>
                                        <a href="/register">Register</a>
                                    </div> :
                                    <p > {email}  </p>}
                        </div>
                    </ul>
                    <div className="user-accounT" >
                        {user !== null ?
                            <div onClick={navTggl}>
                                <img src={user !== null ? user?.photoURL : logo2} alt=" " className="Mail-photo" />
                            </div>
                            :
                            email === '' ?
                                <div className="user-account">
                                    <Link to="/login">Login</Link>
                                    <a href=" " className="slas">/ </a>
                                    <a href="/register">Register</a>
                                </div> :
                                <p onClick={navTggl}>{email} </p>}
                        <div className={isExpandedmenu && (email !== '' || user !== null) ? "expanded" : "not-expanded"}>
                            <div className="profile">
                                <img src={user !== null ? user?.photoURL : imagepath} alt=" " className="profile-img" />
                                {user !== null ? <p >{user?.displayName} </p> : email === '' ? <p> </p> : <p>{email}</p>}
                            </div>
                            <div id="linE"><p></p></div>
                            <div className="profile-1">
                                <div className="profile-img-div">
                                    <img src={logo3} alt=" " className="profile-img-1" />
                                </div>
                                <Link to="/userprofile" ><p>Edit Profile</p></Link>
                                <img src={logo7} alt=" " className="profile-img-arrow-1" />
                            </div>
                            <div className="profile-1">
                                <div className="profile-img-div">
                                    <img src={logo4} alt=" " className="profile-img-1" />
                                </div>
                                <Link to="/userprofile/settings" ><p>Settings</p></Link>
                                <img src={logo7} alt=" " className="profile-img-arrow-2" />
                            </div>
                            <div className="profile-1">
                                <div className="profile-img-div">
                                    <img src={logof} alt=" " className="profile-img-1" />
                                </div>
                                <Link to="/userprofile/review" ><p>Review</p></Link>
                                <img src={logo7} alt=" " className="profile-img-arrow-3" />
                            </div>
                            <div className="profile-1">
                                <div className="profile-img-div">
                                    <img src={logo6} alt=" " className="profile-img-1" />
                                </div>
                                <p onClick={user === null ? deleteUserData : handleSignOut}>Log Out</p>
                                <img src={logo7} alt=" " className="profile-img-arrow-4" />
                            </div>

                        </div>


                    </div>


                </nav>
            </header>
            <div className="m-p" >

                <div className="PROFILE">
                    <h4>Welcome {name}</h4>
                    <li>Profile Information</li>
                    <li><Link to="./useraddress">Manage Address</Link></li>
                    <li><Link to='./settings'>History</Link></li>
                    <li><Link to="./review">Review</Link></li>
                    <ul>
                    </ul>
                </div>
                <div className={isExpandedsidebar ? "PROFILe" : "PROFILe-n"}>
                    <div className="name-btn">
                        <h4>Welcome {name}</h4>
                        <button className="clear" onClick={sideTggl}>
                            <img className="clear-img" src={logo8} alt=" " />
                        </button>

                    </div>

                    <li>Profile Information</li>
                    <li><Link to="./useraddress">Manage Address</Link></li>
                    <li><Link to='./settings'>History</Link></li>
                    <li><Link to="./review">Review</Link></li>
                    <ul>
                    </ul>
                </div>
                <div>
                    <button className={isExpandedbtn ? "menu-bar-btn" : "menu-bar-btn-n"} onClick={sideTggl} >
                        <img className="menu-bar-img" src={logo9} alt=" " />
                    </button>
                </div>
                <div class="my-profile">
                    <div class="my-5">
                        <h3>My Profile</h3>
                        <div>
                            <img src={imagepath} alt=" " className="profile--img" />
                            <button className="profile--btn" onClick={menuTggl}>
                                <img src={logo13} alt=" " className="profile--btn-img" />
                                <img src={logo14} alt=" " className="profile--btn-img" />
                            </button>
                            <div className={isExpandedimgmenu ? "profile-img-menu-expanded" : "profile-img-menu-not-expanded"}>
                                <ul>
                                    <li>
                                        <label htmlFor="image">Upload/Change</label>
                                        <input
                                            type="file"
                                            // ref={fileInputRef}
                                            id="image"
                                            name="image"
                                            placeholder="upload"
                                            style={{ display: 'none' }}
                                            onChange={handleImageChange}
                                        />
                                    </li>
                                    <li onClick={handleRemoveImage}>Remove</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <form className="file-upload" action="">
                        <div className="F-L">
                            <div class="F-name">
                                <input type="text" class="form-control" placeholder="First Name" onChange={(e) => { setFirstname(e.target.value) }} aria-label="First name" />
                            </div>

                            <div class="L-name">
                                <input type="text" class="form-control" placeholder="Last Name" onChange={(e) => { setLastname(e.target.value) }} aria-label="Last name" />
                            </div>
                        </div>
                        <div class="gender">
                            <p>Your Gender</p>
                            <div className="gender-option">
                                <input type="radio" id="male" name="gender" value="male" onChange={(e) => { setGender(e.target.value) }} />
                                <label for="male">Male</label>
                            </div>
                            <div className="gender-option">
                                <input type="radio" id="female" name="gender" value="female" onChange={(e) => { setGender(e.target.value) }} />
                                <label for="female">Female</label>
                            </div>
                        </div>
                        <div class="m-number">
                            <label class="form-label">Mobile number </label>
                            <input type="text" class="form-control" placeholder="" onChange={handleChangeNumber} aria-label="Phone number" />
                            {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
                        </div>
                        {/* 
                        <div class="e-mail">
                            <label for="inputEmail4" class="form-label">Email </label>
                            <input type="email" class="form-control" onChange={(e) => { setE_mail(e.target.value) }} id="inputEmail4" />
                        </div> */}

                        <div class="occu">
                            <label class="form-label">Occupation</label>
                            <input type="text" class="form-control" placeholder="" onChange={(e) => { setOccupation(e.target.value) }} aria-label="Phone number" />
                        </div>
                        <button className="bttn" onClick={submit}>Save</button>
                    </form>
                </div>

            </div>
            <div className="p-f">
                <h1>
                    .
                </h1>
            </div>
        </div>
    )


}