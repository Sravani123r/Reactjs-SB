import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect,useState } from "react";


const AvailableMeals = () => {
  const [Meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-5945e-default-rtdb.firebaseio.com/Meals.json');
      const responseData = await response.json();
      
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);

    };
    fetchMeals();
    }, []);
    if (isLoading) {
      return (
        <section className={classes.MealsLoading}>
        <p>Loading.....</p>
      </section>
    );
  }
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "McChicken Burger",
//     description: "The Classic Burger",
//     price: 112,
//   },
//   {
//     id: "m2",
//     name: "Chicken leg piece",
//     description: "Special crispy chicken.",
//     price: 70,
//   },
//   {
//     id: "m3",
//     name: "Chicken Biryani",
//     description: "tasty and spicy biryani",
//     price: 120,
//   }, 
//   {
//     id: "m4",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 120,
//   },
//   {
//     id: "m5",
//     name: "Pepper Barbecue Chicken Pizza",
//     description: "with more spice",
//     price: 259,
//   },
//   {
//     id: "m6",
//     name: "Pizza dosa",
//     description: "delicioius",
//     price: 70,
//   },
//   {
//     id: "m7",
//     name: "Cappucino",
//     description: "Coffee",
//     price: 199,
//   },
//   {
//     id: "m8",
//     name: "Brownie",
//     description: "Spongy",
//     price: 150,
//   },
 
// ];

  const mealsList = Meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;