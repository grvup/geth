import React, { useEffect, useState, useRef } from "react";
import './useraddress.css'
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
import logo9 from "./component/menu-bar.png"
import logof from './component/feedback.png'
import { useLocation, Link } from 'react-router-dom';
import axios from "axios";
import { useData } from './DataContext';
import { UserAuth } from './AuthContext';
export default function Useraddress() {
    //const location = useLocation()
    //  console.log(location)
    const { logOut, user } = UserAuth();
    const { userData, deleteUserData,data ,fetchData } = useData();
    const { email, username } = userData;
    const [selectedImage, setSelectedImage] = useState(user?.photoURL);
    const fileInputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [inputValuename, setInputValuename] = useState('');
    const [inputValuemnumber, setInputValuemnumber] = useState('');
    const [inputValuepincode, setInputValuepincode] = useState('');
    const [inputValuelocality, setInputValuelocality] = useState('');
    const [inputValuecity, setInputValuecity] = useState('');
    const [inputValuelandmark, setInputValuelandmark] = useState('');
    const [inputValueanumber, setInputValueanumber] = useState('');

    useEffect(() => {
        if (username) {
            fetchData();
           }
    }, []);
    // console.log(data)
    let image = username? data ? data.image : '' : '';
    let Name =  username ? data ? data.firstname : '':' ';
    let imagepath = image || 'default.jpg'
    imagepath = process.env.PUBLIC_URL + '/upload/' + imagepath

    let name = Name|| "User"
    // console.log(inputValuemnumber)
    const [address, setAddress] = useState({
        name: '',
        mnumber: '',
        pincode: ' ',
        locality: '',
        address_1: '',
        city: '',
        state: '',
        landmark: '',
        addtionalnumber: ' '
    });
    const [phoneError, setPhoneError] = useState("");
    const [phoneErrorAdd, setPhoneErrorAdd] = useState("");
    const handleChangeNumberAdd = (e)=>{
        // setMobile(e.target.value)
        const phoneNumber = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        if (phoneNumber.length !== 10) {
            setPhoneErrorAdd("Phone number must be 10 digits.");
        } else {
            setPhoneErrorAdd("");
        }
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setSelectedImage(URL.createObjectURL(file));
        }
        setisExpandedimgmenu(!isExpandedimgmenu)
        console.log(1)
        console.log(file);
      };
    
      const handleRemoveImage = () => {
        setSelectedImage(user?.photoURL);
        setisExpandedimgmenu(!isExpandedimgmenu)
        fileInputRef.current.value = '';
        console.log(1)
      };
    async function submit(e) {
        e.preventDefault();
        try {
            await axios.patch("http://localhost:8000/useraddress", {
                address , username
            })
            .then(res=>{
                if(res.data==='not exist')
                {
                    alert("Mobile number does not exist. Change mobile number and try again");
                }
            })
            .catch(e=>{
               // alert("wrong details")
                console.log(e);
            })
        }
        catch (e) {
            console.log(e);
        }
    }
    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

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


    useEffect(() => {
        // Your code for any side effects when `inputValue` or `isFocused` changes can go here.
    }, [address]);


    // console.log(inputValue)
    const textareaClass = inputValue ? 'focus-L' : 'L';
    const inputnameClass = inputValuename ? 'f-name-L' : 'name-L';
    const inputmnumberClass = inputValuemnumber ? 'f-name-L' : 'name-L';
    const inputlocalityClass = inputValuelocality ? 'f-name-L' : 'name-L';
    const inputpincodeClass = inputValuepincode ? 'f-name-L' : 'name-L';
    const inputcityClass = inputValuecity ? 'f-name-L' : 'name-L';
    const inputlandmarkClass = inputValuelandmark ? 'f-name-L' : 'name-L';
    const inputanumberClass = inputValueanumber ? 'f-name-L' : 'name-L';



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
                    <Link to="/userprofile"><li>Profile Information</li></Link>
                    <Link to="/userprofile/useraddress"><li>Manage Address</li></Link>
                    <Link to="/userprofile/settings"> <li>History</li></Link>
                    <li><Link to="/userprofile/review">Review</Link></li>
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

                    <Link to="/userprofile"><li>Profile Information</li></Link>
                    <Link to="/userprofile/useraddress"><li>Manage Address</li></Link>
                    <Link to="/userprofile/settings"> <li>History</li></Link>
                    <li><Link to="/userprofile/review">Review</Link></li>
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
                        <h3>My Address</h3>
                        <div>
                            <img src={imagepath} alt=" " className="profile--img" />
                            <button className="profile--btn" onClick={menuTggl}>
                                <img src={logo13} alt=" " className="profile--btn-img" />
                                <img src={logo14} alt=" " className="profile--btn-img" />
                            </button>
                            <div className={isExpandedimgmenu ? "profile-img-menu-expanded" : "profile-img-menu-not-expanded"}>
                                <ul>
                                    <li><form>
                                        <label htmlFor="fileInput" >Upload/Change</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            id="fileInput"
                                            placeholder="upload"
                                            style={{ display: 'none' }}
                                            onChange={handleImageChange}
                                        />
                                        </form></li>
                                        <li onClick={handleRemoveImage}>Remove</li>
                                </ul>
                            </div>
                        </div>


                    </div>
                    <hr />
                    <form className="file-upload">
                        <div className="F-L">
                            <div class="F-name-container">
                                <input type="text" id="form-name" name="F-name"
                                    onChange={(e) => {
                                        setInputValuename(e.target.value);
                                        setAddress((prevAddress) => ({
                                            ...prevAddress,
                                            name: e.target.value
                                        }))
                                    }} />
                                <label for="F-name" className={inputnameClass}>Name*</label>
                            </div>

                            <div class="F-name-container">
                                <input type="text" id="form-name" name="m-number"
                                    onChange={(e) => {
                                        setInputValuemnumber(e.target.value);
                                        setAddress((prevAddress) => ({
                                            ...prevAddress,
                                            mnumber: e.target.value
                                        }))
                                        const phoneNumber = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                                        // console.log(inputValuemnumber)
                                        // console.log(phoneError)
                                        if (phoneNumber.length !== 10 ) {
                                            setPhoneError("Phone number must be 10 digits.");
                                        } else {
                                            setPhoneError("");
                                        }
                                    }} />
                                <label for="m-number" className={inputmnumberClass}>Mobile Number*</label>
                                { !inputValuemnumber ? " ":phoneError && <p style={{ color: 'red' ,margin:'14px 0 0 0'}}>{phoneError}</p> }
                            </div>
                        </div>
                        <div className="F-L">
                            <div class="F-name-container">
                                <input type="text" id="form-name" name="pincode"
                                    onChange={(e) => {
                                        setInputValuepincode(e.target.value);
                                        setAddress((prevAddress) => ({
                                            ...prevAddress,
                                            pincode: e.target.value
                                        }))
                                    }} />
                                <label for="pincode" className={inputpincodeClass}>Pincode*</label>
                            </div>

                            <div class="F-name-container">
                                <input type="text" id="form-name" name="locality"
                                    onChange={(e) => {
                                        setInputValuelocality(e.target.value);
                                        setAddress((prevAddress) => ({
                                            ...prevAddress,
                                            locality: e.target.value
                                        }))
                                    }} />
                                <label for="locality" className={inputlocalityClass}>Locality*</label>
                            </div>
                        </div>
                        <div className="input-container">

                            <textarea id="myTextarea" name="myTextarea" rows="4" cols="50"
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    setAddress((prevAddress) => ({
                                        ...prevAddress,
                                        address_1: e.target.value
                                    }))
                                }}
                            >
                            </textarea>
                            <label className={textareaClass} for="myTextarea">Address(Area & Street)*</label>
                        </div>

                        <div className="F-L">
                            <div class="F-name-container">
                                <input type="text" id="form-name" name="city"
                                    onChange={(e) => {
                                        setInputValuecity(e.target.value);
                                        setAddress((prevAddress) => ({
                                            ...prevAddress,
                                            city: e.target.value
                                        }))
                                    }} />
                                <label for="city" className={inputcityClass}>City/District*</label>
                            </div>

                            <div class="F-name-container-states">

                                {/* <label for="states" className="State-name">State*</label> */}
                                <select id="states" name="states"
                                    onChange={(e) => {
                                        setAddress((prevAddress) => ({
                                            ...prevAddress,
                                            state: e.target.value
                                        }));
                                    }}>
                                    <option disabled selected> --Select State--</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>
                                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                    <option value="Chandigarh">Chandigarh</option>
                                    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                    <option value="Lakshadweep">Lakshadweep</option>
                                    <option value="Delhi">Delhi</option>
                                    <option value="Puducherry">Puducherry</option>
                                </select>
                            </div>
                        </div>
                        <div className="F-L">
                            <div class="F-name-container">
                                <input type="text" id="form-name" name="landmark"
                                    onChange={(e) => {
                                        setInputValuelandmark(e.target.value);
                                        setAddress((prevAddress) => ({
                                            ...prevAddress,
                                            landmark: e.target.value
                                        }))
                                    }} />
                                <label for="landmark" className={inputlandmarkClass}>Landmark</label>
                            </div>

                            <div class="F-name-container">
                                <input type="text" id="form-name" name="a-number"
                                    onChange={(e) => {
                                        setInputValueanumber(e.target.value);
                                        setAddress((prevAddress) => ({
                                            ...prevAddress,
                                            addtionalnumber: e.target.value
                                            
                                        }))
                                        const phoneNumber = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
                                        if (phoneNumber.length !== 10) {
                                            setPhoneErrorAdd("Phone number must be 10 digits.");
                                        } else {
                                            setPhoneErrorAdd("");
                                        }
                                    }} />
                                <label for="a-number" className={inputanumberClass}>Alternate Phone</label>
                                { !inputValueanumber ? " ":phoneErrorAdd && <p style={{ color: 'red' ,margin:'14px 0 0 0'}}>{phoneErrorAdd}</p> }
                            </div>
                        </div>
                        <div className="bttns">
                            <button className="btttn" onClick={submit} >Save</button>
                            <button className="btttn" >Cancel</button>
                        </div>

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