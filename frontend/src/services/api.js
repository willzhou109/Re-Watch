const BASE_URL = "https://api.jikan.moe/v4";

// Search anime by title
export const searchAnime = async (query, limit = 20, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=${limit}&page=${page}`
  );
  const json = await res.json();
  return json.data;
};

export const getPopularAnime = async (limit = 20, page = 1) => {
  const res = await fetch(`${BASE_URL}/top/anime?filter=bypopularity&limit=${limit}&page=${page}`);
  const json = await res.json();
  return json.data;
};


export const getAnimeById = async (id) => {
  const res = await fetch(`${BASE_URL}/anime/${id}/full`);
  const json = await res.json();
  return json.data;
};
