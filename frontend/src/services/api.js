const BASE_URL = "http://";


export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`);
    const data = await response.json()
    return data
}

export const getMovies = async () => {
  const resp = await fetch(`${BASE_URL}/movies`)
  return resp.json().then(data => data.results)
}