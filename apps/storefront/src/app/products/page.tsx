'use client';
import SidebarProducts from '../../components/sidebarProduct';
import { Suspense } from 'react';
import Products from './products';
import Pagination from './pagination';
import Loading from '../../components/loading';
import Search from './search';
import Sort from './sort';
import { loadAuthors, loadBooks, loadCategories } from './getData';

export default function Index({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    limit?: string;
    category?: string[];
    author?: string[];
    query?: string;
    rating?: string;
    sort?: string
  };
}) {
  const limit = searchParams?.limit || '';
  const page = searchParams?.page || ''
  const category = searchParams?.category || []
  const author = searchParams?.author || []
  const query = searchParams?.query || ''
  const rating = searchParams?.rating || ''
  const sort = searchParams?.sort || ''
  return (
    <div className="container grid md:grid-cols-5 grid-cols-5 gap-6 pt-4 pb-16 items-start mt-5">
      <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
        <SidebarProducts  />
      </div>
      <div className="col-span-4">
        <div className="flex items-center mb-4">
          <div className="grid grid-cols-3 gap-2">
            <Sort />
            <div className="col-span-2">
              <Search />
            </div>
          </div>

          <div className="flex gap-2 ml-auto"></div>
        </div>
        <Suspense  key={query + limit + page + author + category + rating + sort} fallback={<Loading />}>
          <Products
            page={page}
            limit={limit}
            category={category}
            author={author}
            query={query}
            rating={rating}
            sort={sort}
          />
        </Suspense>
      </div>
    </div>
  );
}
