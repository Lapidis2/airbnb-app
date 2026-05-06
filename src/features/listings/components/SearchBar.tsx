import type { ChangeEvent } from "react"
import { FaSearch } from "react-icons/fa"

interface SearchProps{
    value:string,
    onChange:(value:string)=>void
}

function SearchBar({value,onChange }:SearchProps) {
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        onChange(e.target.value)
    }

  return (
   <div className="search">
     <FaSearch className="search__icon" />
    <input type="text"
   value={value} 
   onChange={handleChange}
   placeholder="Search listings..."
   />
   </div>
  )
}

export default SearchBar