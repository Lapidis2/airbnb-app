import { useRef, useEffect } from "react"
import { FaSearch } from "react-icons/fa"
import debounce from "lodash/debounce"

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    const debouncedChange = debounce((newValue: string) => {
        onChange(newValue)
    }, 300)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedChange(e.target.value)
    }

  return (
   <div className="search">
     <FaSearch className="search__icon" />
    <input
        ref={inputRef}
        type="text"
        defaultValue={value}
        onChange={handleChange}
        placeholder="Search listings..."
    />
   </div>
  )
}

export default SearchBar