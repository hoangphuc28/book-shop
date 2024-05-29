import CardItem from "../../components/cardItem";
import SidebarProducts from "../../components/sidebarProduct";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
export default function Index() {
  return (
    <div className="container grid md:grid-cols-5 grid-cols-5 gap-6 pt-4 pb-16 items-start mt-5">
      <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
      <SidebarProducts />
      </div>
      <div className="col-span-4">
        <div className="flex items-center mb-4">
          <select
            name="sort"
            id="sort"
            className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
          >
            <option value="">Default sorting</option>
            <option value="price-low-to-high">Price low to high</option>
            <option value="price-high-to-low">Price high to low</option>
            <option value="latest">Latest product</option>
          </select>
          <div className="flex gap-2 ml-auto">
            <div className="w-full max-w-2xl relative flex">
              <span className="absolute left-4 top-3 text-lg text-gray-400">
                <SearchOutlinedIcon />
              </span>
              <input
              style={{outline: 'none', boxShadow: 'none'}}
                type="text"
                name="search"
                id="search"
                className="outline-none w-96 pl-12 shadow-none border border-primary border-r-0  py-3 pr-3 rounded-l-md hidden md:flex"
                placeholder="search"
              />
              <button className=" items-center bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition md:flex hidden">
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 md:grid-cols-2 gap-5">
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
          <CardItem />
        </div>
      </div>
    </div>
  );
}
