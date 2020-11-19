const url = {
  SEARCH: (str) =>
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${str}`,
  LOOKUP_ID: (id) =>
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  RANDOM: "https://www.themealdb.com/api/json/v1/1/random.php",
};

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

export function getRandomMeal() {
  return request(url.RANDOM).then((data) => adjustShape(data.meals[0]));
}

export function search(searchTerm) {
  return request(url.SEARCH(searchTerm)).then((data) =>
    data.meals ? data.meals.map(adjustShape) : []
  );
}

export function fetchMeal(id) {
  return request(url.LOOKUP_ID(id)).then((data) => adjustShape(data.meals[0]));
}
