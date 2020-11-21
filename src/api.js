const url = {
  SEARCH: (str) =>
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${str}`,
  LOOKUP_ID: (id) =>
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  RANDOM: "https://www.themealdb.com/api/json/v1/1/random.php",
  CATEGORIES: "https://www.themealdb.com/api/json/v1/1/categories.php",
  SELECT: {
    category: (term) =>
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`,
    area: (term) =>
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${term}`,
    ingredient: (term) =>
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`,
  },
};

const ls = localStorage;
const ss = sessionStorage;
const motdLifetime = 24 * 3600 * 1000;

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
        measure: meal["strMeasure" + index],
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
    ingredients,
  };
}

function adjustCategoryShape(cat) {
  return {
    id: cat.idCategory,
    name: cat.strCategory,
    image: cat.strCategoryThumb,
    description: cat.strCategoryDescription,
  };
}

export function getMealOfTheDay() {
  if (
    ls.motd &&
    ls.motdTimestamp &&
    Date.now() - ls.motdTimestamp < motdLifetime
  ) {
    return Promise.resolve(JSON.parse(ls.motd));
  } else {
    return request(url.RANDOM).then((data) => {
      const meal = adjustShape(data.meals[0]);
      ls.motd = JSON.stringify(meal);
      ls.motdTimestamp = Date.now();
      return meal;
    });
  }
}

export function search(searchTerm) {
  return request(url.SEARCH(searchTerm)).then((data) =>
    data.meals ? data.meals.map(adjustShape) : []
  );
}

export function fetchMeal(id) {
  return request(url.LOOKUP_ID(id)).then((data) => adjustShape(data.meals[0]));
}

export function fetchCategories() {
  return request(url.CATEGORIES).then((data) =>
    data.categories.map(adjustCategoryShape)
  );
}

export function selectMeals(type, term) {
  return request(url.SELECT[type](term)).then((data) =>
    data.meals.map(adjustShape)
  );
}
