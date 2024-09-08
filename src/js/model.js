import { API_URL, API_KEY, RES_PER_PAGE } from './config.js';
import { getJSON, sendJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [], // Initialize bookmarks here
  recipes: [], // Initialize recipes here
};

// Load a recipe from the Spoonacular API
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}/information?apiKey=${API_KEY}`);

    state.recipe = {
      id: data.id,
      title: data.title,
      publisher: data.sourceName || 'Unknown',
      sourceUrl: data.sourceUrl,
      image: data.image,
      servings: data.servings,
      cookingTime: data.readyInMinutes,
      ingredients: data.extendedIngredients.map(ing => ({
        id: ing.id,
        quantity: ing.amount,
        unit: ing.unit,
        description: ing.original,
      })),
      bookmarked: state.bookmarks.some(bookmark => bookmark.id === data.id),
    };
  } catch (err) {
    throw err;
  }
};

// Load search results from the Spoonacular API
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(
      `${API_URL}complexSearch?query=${query}&apiKey=${API_KEY}&number=100`
    );

    state.search.results = data.results.map(rec => ({
      id: rec.id,
      title: rec.title,
      publisher: rec.sourceName || 'Unknown',
      image: rec.image,
    }));

    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

// Get results for the current page
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

// Update servings in the current recipe
export const updateServings = function (newServings) {
  state.recipe.servings = newServings;
  state.recipe.ingredients.forEach(ing => {
    ing.quantity *= newServings / state.recipe.servings;
  });
};

// Add a bookmark to the state
export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  persistBookmarks();
};

// Delete a bookmark from the state
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  persistBookmarks();
};

// Persist bookmarks in local storage
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

// Load bookmarks from local storage
const loadBookmarks = function () {
  const bookmarks = localStorage.getItem('bookmarks');
  if (bookmarks) state.bookmarks = JSON.parse(bookmarks);
};

// Load bookmarks on application start
loadBookmarks();

// Upload a new recipe to local storage
export const uploadRecipe = function (newRecipe) {
  const recipe = {
    id: Date.now().toString(), // Create a unique ID for local storage
    ...newRecipe,
  };
  state.recipe = recipe;
  // Save the recipe to local storage
  let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  recipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(recipes));
};
