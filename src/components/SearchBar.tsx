import { ISearchBar } from '../services/Interface'

export function SearchBar ({search, onClick, onChange} : ISearchBar) {

    return(
        <>
            <input
            className="searchBar"
            placeholder="search..."
            value={search}
            onChange={onChange}>
            </input> <button onClick={onClick}>Search</button>
        </>
        );
                
    }

export default SearchBar;