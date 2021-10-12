
export function SearchBar ({search, onClick, onChange} : {search: any, onClick: any, onChange: any}) {

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