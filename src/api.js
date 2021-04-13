import * as storage from "./storage";

const url = {
  SEARCH: (str) =>
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${str}`,
  LOOKUP_ID: (id) =>
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  RANDOM: "https://www.themealdb.com/api/json/v1/1/random.php",
  CATEGORIES: "https://www.themealdb.com/api/json/v1/1/categories.php",
  AREAS: "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
  INGREDIENTS: "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
  SELECT: {
    category: (term) =>
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`,
    area: (term) =>
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`,
    ingredient: (term) =>
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`
  },
  INGREDIENT_IMAGE: (name) => {
    `https://www.themealdb.com/images/ingredients/${name}.png`;
  },
  INGREDIENT_THUMB: (name) => {
    `https://www.themealdb.com/images/ingredients/${name}-Small.png`;
  }
};

const MOTD_LIFETIME = 24 * 3600 * 1000;

// helper functions

function request(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function adjustShape(meal) {
  const ingredients = Object.keys(meal)
    .filter((key) => key.startsWith("strIngredient") && meal[key])
    .map((key) => {
      const index = key.match(/([0-9]+)$/)[0];
      return {
        index,
        ingredient: meal[key],
        measure: meal["strMeasure" + index]
      };
    });

  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    instructions: meal.strInstructions,
    image: meal.strMealThumb,
    thumbnail: meal.strMealThumb + "/preview",
    video: meal.strYoutube,
    ingredients
  };
}

function adjustCategoryShape(cat) {
  return {
    id: cat.idCategory,
    name: cat.strCategory,
    image: cat.strCategoryThumb,
    description: cat.strCategoryDescription
  };
}

function adjustAreaShape(area) {
  return {
    name: area.strArea
  };
}

function adjustIngredientShape(ing) {
  return {
    id: ing.idIngredient,
    name: ing.strIngredient,
    description: ing.strDescription,
    image: url.INGREDIENT_IMAGE(ing.strIngredient),
    thumbnail: url.INGREDIENT_THUMB(ing.strIngredient)
  };
}

// public api

export function getMealOfTheDay() {
  const motd = storage.getItem("motd");
  const timestamp = storage.getItem("motdTimestamp");
  if (motd && timestamp && Date.now() - timestamp < MOTD_LIFETIME) {
    return Promise.resolve(motd);
  }
  return request(url.RANDOM).then((data) => {
    const meal = adjustShape(data.meals[0]);
    storage.setItem("motd", meal);
    storage.setItem("motdTimestamp", Date.now());
    return meal;
  });
}

export function search(searchTerm) {
  return request(url.SEARCH(searchTerm)).then((data) =>
    data.meals ? data.meals.map(adjustShape) : []
  );
}

export function fetchMeal(id) {
  return request(url.LOOKUP_ID(id)).then((data) => adjustShape(data.meals[0]));
}

export function fetchSelectionOptions(type) {
  switch (type) {
    case "categories":
      return request(url.CATEGORIES).then((data) =>
        data.categories.map(adjustCategoryShape)
      );
    case "areas":
      return request(url.AREAS).then((data) => data.meals.map(adjustAreaShape));

    case "ingredients":
      return request(url.INGREDIENTS).then((data) =>
        data.meals.map(adjustIngredientShape)
      );
  }
}

export function selectMeals(type, term) {
  return request(url.SELECT[type](term)).then((data) =>
    data.meals.map(adjustShape)
  );
}

export function loadFavourites() {
  return Promise.resolve(storage.getItem("favourites") || []);
}

export function saveFavourite(meal) {
  const faves = storage.getItem("favourites") || [];
  if (faves.find((fave) => fave.id === meal.id)) {
    return Promise.reject("Meal already favourited");
  }
  faves.push({ timestamp: Date.now(), id: meal.id, meal });
  storage.setItem("favourites", faves);
  return Promise.resolve(faves);
}

export function deleteFavourites(ids) {
  const faves = (storage.getItem("favourites") || []).filter(
    (fave) => !ids.includes(fave.id)
  );
  storage.setItem("favourites", faves);
  return Promise.resolve(faves);
}
