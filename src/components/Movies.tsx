
    export const getMovies = async (searchValue: any) => {
        var page = 1;
        var movieListID: any[] = [];

        while (page <= 2) {
            //gjør et søk etter filmer på 2 pages.
            await fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=866b3677&type=movie&page=${page}`)
                .then(response => response.json())
                // eslint-disable-next-line
                .then(response => {
                    movieListID.push(response.Search.map((movie: { imdbID: string }) => movie.imdbID));
                })
            page++;
        }

        //Setter sammen to lister med ID til 1.
        movieListID = (movieListID[0].concat(movieListID[1]));

        var movieIndex = 0;
        const movieListFull: any[] = [];

        while (movieIndex < movieListID.length) {
            //gjør et søk på id fra moviesID
            await fetch(`http://www.omdbapi.com/?i=${movieListID[movieIndex]}&apikey=866b3677&plot=full`)
                .then(response => response.json())
                .then(response => {
                    movieListFull.push(response);
                });
            movieIndex++;
        }

        return movieListFull;
    }

export default getMovies;

