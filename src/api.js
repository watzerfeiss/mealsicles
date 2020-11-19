const url = {
  SEARCH: (str) =>
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${str}`,
  LOOKUP_ID: (id) =>
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  RANDOM: "https://www.themealdb.com/api/json/v1/1/random.php",
};

const ls = localStorage;
const ss = sessionStorage;
const oneDay = 24 * 3600 * 1000;

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

export function getMealOfTheDay() {
  if (
    ls.motd &&
    ls.motdTimestamp &&
    new Date() - new Date(ls.motdTimestamp) < oneDay
  ) {
    return Promise.resolve(JSON.parse(ls.motd));
  } else {
    return request(url.RANDOM).then((data) => {
      const meal = adjustShape(data.meals[0]);
      ls.motd = JSON.stringify(meal);
      ls.motdTimestamp = new Date();
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
