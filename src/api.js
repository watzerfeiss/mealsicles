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

export function getRandomMeal() {
  return request(url.RANDOM).then((data) => data.meals[0]);
}
