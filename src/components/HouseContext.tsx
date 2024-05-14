import { createContext, useEffect, useState } from "react";

// import data
import { housesData } from "../data";

// create context
export const HouseContext = createContext<any>(housesData); // housesData를 기본값으로 사용

// HouseContext를 제공하는 컴포넌트 정의
function HouseContextProvider({ children }: any) {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState<any>("Location (any)");
  const [countries, setCountries] = useState<any>([]);
  const [property, setProperty] = useState<any>("Property type (any)");
  const [properties, setProperties] = useState<any>([]);
  const [price, setPrice] = useState<any>("Price range (any)");
  const [loading, setLoading] = useState<any>(false);

  // return all countries
  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });
    // remove duplicates
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];
    // set countries state
    setCountries(uniqueCountries);
  }, []);

  // return all properties
  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });
    // remove duplicates
    const uniqueProperties = ["Location (any)", ...new Set(allProperties)];
    // set Properties state
    setProperties(uniqueProperties);
  }, []);

  const handleClick = () => {
    // set loading
    setLoading(true);

    // create a function that chects if the string includes '(any)'
    const isDefault = (str: any) => {
      return str.split(" ").includes("(any)");
    };

    // get first value of price and parse it to number
    const minPrice = parseInt(price.split(" ")[0]);

    // get second value of price which is the maximum price & parse it to number
    const maxPrice = parseInt(price.split(" ")[2]);

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      // if all values are selected
      if (house.country === country && house.type === property && housePrice >= minPrice && housePrice <= maxPrice) {
        return house;
      }

      // if all values are default
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }

      // if country is not default
      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }

      // if property is not default
      if (isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.type === property;
      }

      // if price is not default
      if (isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      // if country & property is not default
      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property;
      }

      // if country & price is not default
      if (!isDefault(country) && isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }

      // if property & price is not default
      if (isDefault(country) && !isDefault(property) && !isDefault(price)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    });

    setTimeout(() => {
      return newHouses.length < 1 ? setHouses([]) : setHouses(newHouses), setLoading(false);
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
}

export default HouseContextProvider;
