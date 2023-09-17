import { useState } from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}

      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

// import { useState } from "react";
// import "./App.css";
// import Header from "./components/Layout/Header";
// import Meals from "./components/Meals/Meals";
// import Cart from "./components/Cart/Cart";
// import CartProvider from "./store/CartProvider";

// function App() {
//   const [cartIsShown, setCartIsShown] = useState(false);

//   const showCartHandler = () => {
//     setCartIsShown(true);
//   };

//   const hideCartHandler = () => {
//     setCartIsShown(false);
//   };

//   // const sendEmailHandler = async () => {
//   //   try {
//   //     const response = await fetch("http://localhost:000/send-email", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         to: "recipient@example.com",
//   //         subject: "Purchase Receipt",
//   //         text: "Thank you for your purchase!",
//   //       }),
//   //     });
//   //     const data = await response.json();
//   //     console.log(data);
//   //   } catch (error) {
//   //     console.error("Error:", error);
//   //   }
//   // };

//   return (
//     <CartProvider>
//       {cartIsShown && <Cart onClose={hideCartHandler} />}
//       <Header onShowCart={showCartHandler} />
//       <main>
//         <Meals />
//       </main>
      
//     </CartProvider>
//   );
// }

// export default App;
