import { icons } from "../../contants"
import InputField from "./InputFields"


const SearchBox = () => {
    return (
        <InputField placeholder="Search" rightIcon={icons.search} />
    )
}

export default SearchBox