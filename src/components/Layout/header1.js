// import { Fragment, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Button from "./elements/Button";

// export const header1 = ({ cartCount }) => {
//     const navigate = useNavigate();
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const handleLogout = () => {
//         sessionStorage.removeItem('Auth token');
//         sessionStorage.removeItem('User Id');
//         window.dispatchEvent(new Event("storage"));
//         navigate("/");
//     }

//     useEffect(() => {
//         const checkAuthToken = () => {
//             const token = sessionStorage.getItem('Auth token');
//             if (token) {
//                 setIsLoggedIn(true);
//             } else {
//                 setIsLoggedIn(false);
//             }
//         }

//         window.addEventListener('storage', checkAuthToken);

//         return () => {
//             window.removeEventListener('storage', checkAuthToken);
//         }
//     }, [])

//     return (
//         <Fragment>
//             <header className={classes.header}>
//                 <h1>Food Ordering App</h1>
//                 <HeaderCartButton onClick={props.onShowCart} />
//             </header>
//             <div className={classes["main-image"]}>
//                 <img src={mainheaderImage} alt="A table full of delicious food!" />
//             </div>
//             <div className="flex items-center justify-center space-x-4">
//                 <Link to="/cart" className="mr-4 relative">
//                     <img src={cartIcon} alt="cart"/>
//                     {cartCount > 0 ? <div className="rounded-full bg-yellow-400 text-white inline-flex justify-center items-center w-full absolute -top-1 -right-1">{cartCount}</div> : null}
//                 </Link>
//                 {
//                     isLoggedIn ? 
//                     <Button onClick={handleLogout}>Log Out</Button> : 
//                     (
//                         <>
//                             <Link to="/login">Log In</Link>
//                             <Link to="/register">Sign Up</Link>
//                         </>
//                     )
//                 }
//             </div>
//         </Fragment>
//     );
// }

// export default Header;
