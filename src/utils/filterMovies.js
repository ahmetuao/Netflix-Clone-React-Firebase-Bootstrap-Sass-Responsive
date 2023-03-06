import { categories } from "./constants";

export const FilterMovies = (method, key, movies, noMerged) => {

  let filtered
  if(method == 1) {
    filtered = movies.filter(
      (movie) => movie.category.categoryId == key,
    )
  return filtered;
  }
  if(method == 2) {
    filtered = movies.filter(
      (movie) => movie.director == key,
    )
  return filtered;
  }

  if(method == 3) {
    const searchTerm = key.toLowerCase().split(" ").join("");
    let turEn;
    let turTr;
    // let turEn;
    // let turTr = [];

    categories.map((category)=>{
      const categoryTitle = category.title.en.toLowerCase().split(" ").join("")
      const categoryTitleTr = category.title.tr.toLowerCase().split(" ").join("")
        if(categoryTitle.includes(searchTerm)) {
          turEn = categoryTitle;
          
        }
        if(categoryTitleTr.includes(searchTerm)) {
          turTr = categoryTitleTr;
          // turTr.push(categoryTitleTr);
        }
      })
      let filtered1 = movies.filter(
        (movie) => { 
          const movieTitle = movie.title.toLowerCase().split(" ").join("");
          return movieTitle.includes(searchTerm)
        },
      )
      let filtered2 = movies.filter(
        (movie) => { 
          const movieTitle = movie.category.categoryTitle.en.toLowerCase().split(" ").join("");
          const movieTitleTr = movie.category.categoryTitle.tr.toLowerCase().split(" ").join("");
          return movieTitleTr.includes(turTr) || movieTitle.includes(turEn)
        },
      )
      if(noMerged) {
        filtered = filtered2;
      }
      else {
        filtered = filtered1.concat(filtered2) 
      }
  return filtered;
  }
}