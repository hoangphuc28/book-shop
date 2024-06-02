'use server';
import SidebarProducts from '../../components/sidebarProduct';
import {
  getAuthors,
  getBooks,
  getCategories,
} from '../../utils/api/graphQL/query';
import clientWithoutAuth from '../../utils/api/graphQL/apolloClientWithoutAuth';
import {  Suspense } from 'react';
import Products from './products';
import Pagination from './pagination';
import Loading from '../../components/loading';
const loadData = async (page = 1, limit = 10, categories: string[], authors: string[]) => {
  // try {
  //   // const res = await clientWithoutAuth.cache.reset()
  //   console.log('res', res)
  // } catch (error) {
  //   console.log('err', error)
  // }
  const bookQuery = await clientWithoutAuth.query({
    query: getBooks,
    variables: {
      page: page,
      limit: limit,
      condition: {
        category: categories,
        author: authors
      }
    }
  });
  const categoryQuery = await clientWithoutAuth.query({ query: getCategories});
  const authorsQuery = await clientWithoutAuth.query({ query: getAuthors});
  console.log(bookQuery.data.getBooks.items)


  return {
    booksData: bookQuery.data.getBooks,
    categoriesData: categoryQuery.data.getCategories,
    authorsData: authorsQuery.data.getAuthors,
  };
};
export default async function Index({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
    category?: string[];
    author?: string[]
  };
}) {
  const { booksData, categoriesData, authorsData } = await loadData(
    parseInt(searchParams?.page || '1'),
    parseInt(searchParams?.limit || '10'),
    searchParams?.category || [],
    searchParams?.author || [],
  );
  return (
    <div className="container grid md:grid-cols-5 grid-cols-5 gap-6 pt-4 pb-16 items-start mt-5">
      <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
        <SidebarProducts categories={categoriesData} authors={authorsData} />
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
            {/* <div className="w-full max-w-2xl relative flex">
              <span className="absolute left-4 top-3 text-lg text-gray-400">
                <SearchOutlinedIcon />
              </span>
              <input
                style={{ outline: 'none', boxShadow: 'none' }}
                type="text"
                name="search"
                id="search"
                className="outline-none w-96 pl-12 shadow-none border border-primary border-r-0  py-3 pr-3 rounded-l-md hidden md:flex"
                placeholder="search"
              />
              <button className=" items-center bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition md:flex hidden">
                Search
              </button>
            </div> */}
            <Pagination
              totalPage={booksData?.totalPage}
              totalItem={booksData?.totalItem}
              currentPage={booksData?.currentPage}
              itemsPerPage={booksData?.itemsPerPage}
            />
          </div>
        </div>
        <Suspense
          fallback={<Loading></Loading>}
        >
          <Products products={booksData.items} />
        </Suspense>
      </div>
    </div>
  );
}
