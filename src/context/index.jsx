import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam("");
        navigate("/");
      }
      //   console.log(data);
      //   console.log(loading, recipeList);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setSearchParam("");
    }
  };

  const handleAddToFavorite = (getCurrentItem) => {
    // console.log(getCurrentItem);
    let cpuFavoritesList = [...favoritesList];
    const index = cpuFavoritesList.findIndex(
      (item) => item.id === getCurrentItem.id
    );
    if (index === -1) {
      cpuFavoritesList.push(getCurrentItem);
    } else {
      cpuFavoritesList.splice(index);
    }
    setFavoritesList(cpuFavoritesList);
  };

  // console.log(favoritesList, "favoritessss");

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        handleAddToFavorite,
        favoritesList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
