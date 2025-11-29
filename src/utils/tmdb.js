export async function fetchTMDBMedia(tmdbId, type) {
  const url = `https://api.themoviedb.org/3/${type}/${tmdbId}?language=en-US`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      accept: "application/json",
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("TMDB request failed: " + errorText);
  }

  const data = await res.json();

  return {
    tmdbId,
    title: data.title || data.name,
    posterPath: data.poster_path,
    type,
    totalEpisodes: data.number_of_episodes || null,
    overview: data.overview,
    releaseDate: data.release_date || data.first_air_date,
  };
}
