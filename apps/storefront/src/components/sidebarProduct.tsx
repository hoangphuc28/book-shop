'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Author } from "../utils/interfaces/author"
import { Category } from "../utils/interfaces/category"

interface Props {
  categories: Category[],
  authors: Author[]
}

export default function SidebarProducts({ categories, authors }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleCheckboxChangeCategory = (event: any, id: string) => {
    const isChecked = event.target.checked;
    const params = new URLSearchParams(searchParams.toString());
    if (isChecked) {
      params.append('category', id);
    } else {
      params.delete('category', id)
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleCheckboxChangeAuthor = (event: any, id: string) => {
    const isChecked = event.target.checked;
    const params = new URLSearchParams(searchParams.toString());
    if (isChecked) {
      params.append('author', id);
    } else {
      params.delete('author', id)
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="divide-y divide-gray-200 space-y-5">
      <div>
        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
        <div className="space-y-2">
          {categories?.map((item: Category, index) => {
            return (
              <div key={index} className="flex items-center">
                <input
                  onChange={(event) => handleCheckboxChangeCategory(event, item.categoryID)}
                  type="checkbox" name="cat-1" id="cat-1" className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                <label htmlFor="cat-1" className="text-gray-600 ml-3 cusror-pointer">{item.name}</label>
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Authors</h3>
        <div className="space-y-2">
          {authors?.map((item: Author, index) => {
            return (
              <div key={index} className="flex items-center">
                <input
                  onChange={(event) => handleCheckboxChangeAuthor(event, item.id)}
                type="checkbox" name="cat-1" id="cat-1" className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                <label htmlFor="cat-1" className="text-gray-600 ml-3 cusror-pointer">{item.name}</label>
              </div>
            )
          })}
        </div>
      </div>


    </div>
  )
}
