
export interface moviesID {
    imdbID: string,
}

export interface ISort {
    children: any,
    sortBy: string,
    filterBy: string,
    ascension: string
}

export interface moviesFull {
    Title: string,
    Runtime: string,
    Director: string,
    Genre: string,
    Year: string,
    imdbRating: string,
    imdbVotes: string,
    Country: string,
    Plot: string,
    Actors: string,
    Poster: string
}

export interface ISearchBar {
    search: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    onChange: any,
}

export interface IDropDown {
    onClickAction: React.MouseEventHandler<HTMLButtonElement>,
    onClickRating: React.MouseEventHandler<HTMLButtonElement>,
}