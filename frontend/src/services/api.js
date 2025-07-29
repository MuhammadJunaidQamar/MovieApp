const BASE_URL = import.meta.env.VITE_BASE_URL;

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`);
    const data = await response.json()
    return data
}

export const getMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movies`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error("Failed to fetch movies:", err);
    return [];
  }
};
