'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Author } from "../utils/interfaces/author"
import { Category } from "../utils/interfaces/category"
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import React from "react";
import { getCategories } from "../utils/api/graphQL/query";
import { loadAuthors, loadCategories } from "../app/products/fetchData";

interface Props {
  categories: Category[],
  authors: Author[]
}

export default function SidebarProducts() {
  const [categories, setCategories] = useState<Category[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const ratingValue = searchParams.get('rating');
  const parsedRating = ratingValue ? parseInt(ratingValue, 10) : 0;

  const handleCheckboxChangeCategory = (event: any, id: string) => {
    const isChecked = event.target.checked;
    const params = new URLSearchParams(searchParams.toString());
    if (isChecked) {
      params.set('page', '1')
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
      params.set('page', '1')
      params.append('author', id);
    } else {
      params.delete('author', id)
    }
    replace(`${pathname}?${params.toString()}`);
  };
  const isCategoryChecked = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const categoryParam = params.getAll('category')

    if (Array.isArray(categoryParam)) {
      return categoryParam.includes(categoryId);
    }
  };
  const isAuthorChecked = (authorId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const authorParams = params.getAll('author')
    if (Array.isArray(authorParams)) {
      return authorParams.includes(authorId);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const {categories} = await loadCategories();
        setCategories(categories);
        const {authors} = await loadAuthors()
        setAuthors(authors)
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="divide-y divide-gray-200 space-y-5">
      <div>
        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
        <div className="space-y-2">
          {categories?.map((item: Category, index) => {
            return (
              <div key={index} className="flex items-center">
                <input
                  checked={isCategoryChecked(item.categoryID)}
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
                  checked={isAuthorChecked(item.id)}
                  onChange={(event) => handleCheckboxChangeAuthor(event, item.id)}
                  type="checkbox" name="cat-2" id="cat-2" className="text-primary focus:ring-0 rounded-sm cursor-pointer" />
                <label htmlFor="cat-2" className="text-gray-600 ml-3 cusror-pointer">{item.name}</label>
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Rating</h3>
        <div className="space-y-2">
          <Rating
            name="simple-controlled"
            value={parsedRating}
            onChange={(event, newValue) => {
              const params = new URLSearchParams(searchParams.toString());
              console.log(newValue)
              if(newValue)
                params.set('rating', newValue?.toString())
              else
                params.delete('rating')
              replace(`${pathname}?${params.toString()}`);

            }}
          />
        </div>
      </div>


    </div>
  )
}
