import { createContext, useContext, useState } from "react";

const BasketWiseContext = createContext();

export function BasketWiseProvider({ children }) {
  const [basketWise, setBasketWise] = useState({
    "Institute level Courses": [],
    "Discipline Core Courses": [],
    "Discipline Electives": [],
    "HSS Basket": [],
    "Math Basket": [],
    "Materials Basket": [],
    "Science Basket": [],
    "Open Electives": []
  });

  return (
    <BasketWiseContext.Provider value={{ basketWise, setBasketWise }}>
      {children}
    </BasketWiseContext.Provider>
  );
}

export function useBasketWise() {
  return useContext(BasketWiseContext);
}

