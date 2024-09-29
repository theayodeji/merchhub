
const Searchbar = () => {
  return (
    <div className="hidden md:flex items-center bg-white rounded-xl p-2 gap-2 w-1/2">
        <img src="/assets/Search_alt.png" alt="" />
        <input className="bg-transparent flex-1" type="search" name="searchbar" id="searchbar" placeholder="Search" />
    </div>
  )
}

export default Searchbar