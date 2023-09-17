import React ,{ useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import CartContext from '../../store/Cart-context';
import OrderDelivered from "./OrderDelivered"



const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);

  const cartCtx = useContext(CartContext);



  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  
  const orderHanlder = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://react-http-5945e-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
      user: userData,
      orderedItems:cartCtx.items
      }),
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    setIsOrderSubmitted(true);
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHanlder}>
          Order
        </button>
      )}
    </div>
  );

  
  const cartModalContent = (
    <React.Fragment>
      {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {isCheckout && (<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />)}
    {!isCheckout && modalActions}
  </React.Fragment>
  );

  const isSubmittingModalContent = <p><h3>Sending Order data...</h3></p>;

  const didSubmitModalContent = (
    <p><h2>Successfully Sent the Order!</h2></p>
  
    );


  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
      {isOrderSubmitted && <OrderDelivered onClose={props.onClose} />}
    </Modal>
  );
};

export default Cart; 



// import React, { useContext, useState } from "react";
// import Modal from "../UI/Modal";
// import classes from "./Cart.module.css";
// import CartItem from "./CartItem";
// import Checkout from "./Checkout";
// import CartContext from '../../store/Cart-context';
// import OrderDelivered from "./OrderDelivered";



// const Cart = (props) => {
//   const [isCheckout, setIsCheckout] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [didSubmit, setDidSubmit] = useState(false);
//   const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);

//   const cartCtx = useContext(CartContext);

//   const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
//   const hasItems = cartCtx.items.length > 0;

//   const cartItemRemoveHandler = (id) => {
//     cartCtx.removeItem(id);
//   };

//   const cartItemAddHandler = (item) => {
//     cartCtx.addItem({ ...item, amount: 1 });
//   };

//   const orderHandler = () => {
//     setIsCheckout(true);
//   };

//   const submitOrderHandler = async (userData) => {
//     setIsSubmitting(true);

//     const response = await fetch('http://localhost:3000/send-email', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         to: 'recipient@example.com', // Replace with the recipient's email address
//         subject: 'New Order',
//         text: `You have a new order from ${userData.name}.`,
//       }),
//     });

//     if (response.ok) {
//       setIsSubmitting(false);
//       setDidSubmit(true);
//       setIsOrderSubmitted(true);
//       cartCtx.clearCart();
//     } else {
//       // Handle error, for example show an error message to the user
//     }
//   };

//   const cartItems = (
//     <ul className={classes["cart-items"]}>
//       {cartCtx.items.map((item) => (
//         <CartItem
//           key={item.id}
//           name={item.name}
//           amount={item.amount}
//           price={item.price}
//           onRemove={cartItemRemoveHandler.bind(null, item.id)}
//           onAdd={cartItemAddHandler.bind(null, item)}
//         />
//       ))}
//     </ul>
//   );

//   const modalActions = (
//     <div className={classes.actions}>
//       <button className={classes["button--alt"]} onClick={props.onClose}>
//         Close
//       </button>
//       {hasItems && (
//         <button className={classes.button} onClick={orderHandler}>
//           Order
//         </button>
//       )}
//     </div>
//   );

//   const cartModalContent = (
//     <React.Fragment>
//       {cartItems}
//       <div className={classes.total}>
//         <span>Total Amount</span>
//         <span>{totalAmount}</span>
//       </div>
//       {isCheckout && (
//         <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
//       )}
//       {!isCheckout && modalActions}
//     </React.Fragment>
//   );

//   const isSubmittingModalContent = <p><h3>Sending Order data...</h3></p>;

//   const didSubmitModalContent = <p><h2>Successfully Sent the Order!</h2></p>;

//   return (
//     <Modal onClose={props.onClose}>
//       {!isSubmitting && !didSubmit && cartModalContent}
//       {isSubmitting && isSubmittingModalContent}
//       {!isSubmitting && didSubmit && didSubmitModalContent}
//       {isOrderSubmitted && <OrderDelivered onClose={props.onClose} />}
//     </Modal>
//   );
// };

// export default Cart;




// import React ,{ useContext, useState } from "react";
// import Modal from "../UI/Modal";
// import classes from "./Cart.module.css";
// import CartItem from "./CartItem";
// import Checkout from "./Checkout";
// import CartContext from '../../store/Cart-context';
// import OrderDelivered from "./OrderDelivered"



// const Cart = (props) => {
//   const [isCheckout, setIsCheckout] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [didSubmit, setDidSubmit] = useState(false);
//   const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);

//   const cartCtx = useContext(CartContext);



//   const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
//   const hasItems = cartCtx.items.length > 0;

//   const cartItemRemoveHandler = (id) => {
//     cartCtx.removeItem(id);
//   };

//   const cartItemAddHandler = (item) => {
//     cartCtx.addItem({ ...item, amount: 1 });
//   };
  
//   const orderHanlder = () => {
//     setIsCheckout(true);
//   };

//   const submitOrderHandler = async (userData) => {
//   setIsSubmitting(true);
//   try {
//     const response = await fetch('http://localhost:5000/send-email', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         to: userData.email,  // Assuming email is the recipient's email address
//         subject: 'New Food Order',
//         text: 'You have a new food order!',
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Email sending failed');
//     }

//     setIsSubmitting(false);
//     setDidSubmit(true);
//     setIsOrderSubmitted(true);
//     cartCtx.clearCart();
//   } catch (error) {
//     console.error('Error:', error);
//     setIsSubmitting(false);
//   }
// };


//   const cartItems = (
//     <ul className={classes["cart-items"]}>
//       {cartCtx.items.map((item) => (
//         <CartItem
//           key={item.id}
//           name={item.name}
//           amount={item.amount}
//           price={item.price}
//           onRemove={cartItemRemoveHandler.bind(null, item.id)}
//           onAdd={cartItemAddHandler.bind(null, item)}
//         />
//       ))}
//     </ul>
//   );

//   const modalActions = (
//     <div className={classes.actions}>
//       <button className={classes["button--alt"]} onClick={props.onClose}>
//         Close
//       </button>
//       {hasItems && (
//         <button className={classes.button} onClick={orderHanlder}>
//           Order
//         </button>
//       )}
//     </div>
//   );

  
//   const cartModalContent = (
//     <React.Fragment>
//       {cartItems}
//     <div className={classes.total}>
//       <span>Total Amount</span>
//       <span>{totalAmount}</span>
//     </div>
//     {isCheckout && (<Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />)}
//     {!isCheckout && modalActions}
//   </React.Fragment>
//   );

//   const isSubmittingModalContent = <p><h3>Sending Order data...</h3></p>;

//   const didSubmitModalContent = (
//     <p><h2>Successfully Sent the Order!</h2></p>
  
//     );

  
//   return (
//     <Modal onClose={props.onClose}>
//       {!isSubmitting && !didSubmit && cartModalContent}
//       {isSubmitting && isSubmittingModalContent}
//       {!isSubmitting && didSubmit && didSubmitModalContent}
//       {isOrderSubmitted && <OrderDelivered onClose={props.onClose} />}
//     </Modal>
//   );
// };

// export default Cart;


// import React, { useContext, useState } from "react";
// import Modal from "../UI/Modal";
// import classes from "./Cart.module.css";
// import CartItem from "./CartItem";
// import Checkout from "./Checkout";
// import axios from 'axios';
// import CartContext from '../../store/Cart-context';
// import OrderDelivered from "./OrderDelivered";
// import ThankYouMessage from "./ThankYouMessage";

// const Cart = (props) => {
//   const [isCheckout, setIsCheckout] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [didSubmit, setDidSubmit] = useState(false);
//   const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
//   const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
//   const [data, setData] = useState(null);
//   const cartCtx = useContext(CartContext);
//   const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
//   const hasItems = cartCtx.items.length > 0;



//   const cartItemRemoveHandler = (id) => {
//     cartCtx.removeItem(id);
//   };

//   const cartItemAddHandler = (item) => {
//     cartCtx.addItem({ ...item, amount: 1 });
//   };

//   const orderHandler = () => {
//     setIsCheckout(true);
//   };

//   // const submitOrderHandler = async (userData) => {
//   //   setIsSubmitting(true);



//   //   setIsSubmitting(false);
//   //   setDidSubmit(true);
//   //   setIsOrderSubmitted(true);
//   //   cartCtx.clearCart();
//   // };

//   const submitOrderHandler = async (userData) => {
//   setIsSubmitting(true);

//   try {
//     const response = await fetch('http://localhost:3000/send-email', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         to: 'recipient@example.com', // Email recipient
//         subject: 'Order Confirmation', // Email subject
//         text: 'Thank you for your order!', // Email body
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     setIsSubmitting(false);
//     setDidSubmit(true);
//     setIsOrderSubmitted(true);
//     cartCtx.clearCart();
//   } catch (error) {
//     console.error('Error:', error);
//     setIsSubmitting(false);
//     // Handle the error, show a message to the user, etc.
//   }
// };

// useEffect(() => {
//     const apiKey = '34a9a4c16507414db4e311373672bfb4';
//     const email = 'sravanibannuru2002@outlook.com';
//     const apiUrl = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`;

//     axios.get(apiUrl)
//       .then(response => setData(response.data))
//       .catch(error => console.error('Error:', error));
//   }, []);

//   return (
//     <div>
//       {data ? (
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }

//   const cartItems = (
//     <ul className={classes["cart-items"]}>
//       {cartCtx.items.map((item) => (
//         <CartItem
//           key={item.id}
//           name={item.name}
//           amount={item.amount}
//           price={item.price}
//           onRemove={cartItemRemoveHandler.bind(null, item.id)}
//           onAdd={cartItemAddHandler.bind(null, item)}
//         />
//       ))}
//     </ul>
//   );

//   const modalActions = (
//     <div className={classes.actions}>
//       <button className={classes["button--alt"]} onClick={props.onClose}>
//         Close
//       </button>
//       {hasItems && (
//         <button className={classes.button} onClick={orderHandler}>
//           Order
//         </button>
//       )}
//     </div>
//   );

//   const cartModalContent = (
//     <>
//       {cartItems}
//       <div className={classes.total}>
//         <span>Total Amount</span>
//         <span>{totalAmount}</span>
//       </div>
//       {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
//       {!isCheckout && modalActions}
//     </>
//   );

//   const isSubmittingModalContent = <p><h3>Sending Order data...</h3></p>;

//   const didSubmitModalContent = (
//     <p><h2>Successfully Sent the Order!</h2></p>
//   );

//   return (
//     <Modal onClose={props.onClose}>
//       {!isSubmitting && !didSubmit && cartModalContent}
//       {isSubmitting && isSubmittingModalContent}
//       {!isSubmitting && didSubmit && didSubmitModalContent}
//       {isOrderSubmitted && <OrderDelivered onClose={props.onClose} />}
//     </Modal>
//   );
// };

// export default Cart;


// import { useContext, useState } from "react";
// import Modal from "../UI/Modal";
// import classes from "./Cart.module.css";
// import CartItem from "./CartItem";
// import CartContext from '../../store/Cart-context';
// import OrderDelivered from "./OrderDelivered";

// const Cart = (props) => {
//   const cartCtx = useContext(CartContext);

//   const [showOrder, setShowOrder] = useState(false);

//   const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
//   const hasItems = cartCtx.items.length > 0;

//   const cartItemRemoveHandler = (id) => {
//     cartCtx.removeItem(id);
//   };

//   const cartItemAddHandler = (item) => {
//     cartCtx.addItem({ ...item, amount: 1 });
//   };

  
//   const orderHanlder = () => {
//     cartCtx.clearall();
//     setShowOrder(true);
//   };

//   const cartItems = (
//     <ul className={classes["cart-items"]}>
//       {cartCtx.items.map((item) => (
//         <CartItem
//           key={item.id}
//           name={item.name}
//           amount={item.amount}
//           price={item.price}
//           onRemove={cartItemRemoveHandler.bind(null, item.id)}
//           onAdd={cartItemAddHandler.bind(null, item)}
//         />
//       ))}
//     </ul>
//   );

//   return (
//     <Modal onClose={props.onClose}>
//       {!showOrder ? (
//         <>
//           {cartItems}
//           <div className={classes.total}>
//             <span>Total Amount</span>
//             <span>{totalAmount}</span>
//           </div>
//           <div className={classes.actions}>
//             <button className={classes["button--alt"]} onClick={props.onClose}>
//               Close
//             </button>
//             {hasItems && (
//               <button className={classes.button} onClick={orderHanlder}>
//                 Order
//               </button>
//             )}
//           </div>
//         </>
//       ) : (
//         <OrderDelivered onClose={props.onClose} />
//       )}
//     </Modal>
//   );
// };

// export default Cart;


// import React, { useContext, useState, useEffect } from "react";
// import Modal from "../UI/Modal";
// import classes from "./Cart.module.css";
// import CartItem from "./CartItem";
// import Checkout from "./Checkout";
// import axios from 'axios';
// import CartContext from '../../store/Cart-context';
// import OrderDelivered from "./OrderDelivered";
// import ThankYouMessage from "./ThankYouMessage";

// const Cart = (props) => {
//   const [isCheckout, setIsCheckout] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [didSubmit, setDidSubmit] = useState(false);
//   const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
//   const [data, setData] = useState({});
//   const cartCtx = useContext(CartContext);
//   const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
//   const hasItems = cartCtx.items.length > 0;

//   const cartItemRemoveHandler = (id) => {
//     cartCtx.removeItem(id);
//   };

//   const cartItemAddHandler = (item) => {
//     cartCtx.addItem({ ...item, amount: 1 });
//   };

//   const orderHandler = () => {
//     setIsCheckout(true);
//   };

//   const submitOrderHandler = async () => {
//     setIsSubmitting(true);

//     try {
//       const response = await axios.post('http://localhost:3000/send-email', {
//         to: 'recipient@example.com', // Email recipient
//         subject: 'Order Confirmation', // Email subject
//         text: 'Thank you for your order!', // Email body
//       });

//       if (!response.status === 200) {
//         throw new Error('Network response was not ok');
//       }

//       setIsSubmitting(false);
//       setDidSubmit(true);
//       setIsOrderSubmitted(true);
//       cartCtx.clearCart();
//     } catch (error) {
//       console.error('Error:', error);
//       setIsSubmitting(false);
//       // Handle the error, show a message to the user, etc.
//     }
//   };




//   const cartItems = (
//     <ul className={classes["cart-items"]}>
//       {cartCtx.items.map((item) => (
//         <CartItem
//           key={item.id}
//           name={item.name}
//           amount={item.amount}
//           price={item.price}
//           onRemove={cartItemRemoveHandler.bind(null, item.id)}
//           onAdd={cartItemAddHandler.bind(null, item)}
//         />
//       ))}
//     </ul>
//   );

//   const modalActions = (
//     <div className={classes.actions}>
//       <button className={classes["button--alt"]} onClick={props.onClose}>
//         Close
//       </button>
//       {hasItems && (
//         <button className={classes.button} onClick={orderHandler}>
//           Order
//         </button>
//       )}
//     </div>
//   );

//   const cartModalContent = (
//     <>
//       {cartItems}
//       <div className={classes.total}>
//         <span>Total Amount</span>
//         <span>{totalAmount}</span>
//       </div>
//       {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
//       {!isCheckout && modalActions}
//     </>
//   );

//   const isSubmittingModalContent = <p><h3>Sending Order data...</h3></p>;

//   const didSubmitModalContent = (
//     <ThankYouMessage onClose={props.onClose} />
//   );

//   return (
//     <Modal onClose={props.onClose}>
//       {!isSubmitting && !didSubmit && cartModalContent}
//       {isSubmitting && isSubmittingModalContent}
//       {!isSubmitting && didSubmit && didSubmitModalContent}
//       {isOrderSubmitted && <OrderDelivered onClose={props.onClose} />}
      
//     </Modal>

  
//   );
// };



// export default Cart;
