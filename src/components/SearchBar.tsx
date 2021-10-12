import { ISearchBar } from '../services/Interface'

export function SearchBar ({search, onClick, onChange} : ISearchBar) {

    return(
        <>
            <input
            placeholder="search..."
            value={search}
            onChange={onChange}>
            </input><button className='searchBarButton' onClick={onClick}>Search</button>
        </>
        );
                
    }

export default SearchBar;