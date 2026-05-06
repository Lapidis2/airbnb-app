import { useRef, useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import { useStore } from "../../../store/StoreContext"
import debounce from "lodash/debounce"

function SearchBar() {
    const { state, dispatch } = useStore()
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const debouncedDispatch = debounce((value: string) => {
        dispatch({ type: 'SET_FILTER', payload: value })
    }, 300)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedDispatch(e.target.value)
    }

  return (
   <div className="search">
     <FaSearch className="search__icon" />
    <input
        ref={inputRef}
        type="text"
        defaultValue={state.filter}
        onChange={handleChange}
        placeholder="Search listings..."
    />
   </div>
  )
}

export default SearchBar