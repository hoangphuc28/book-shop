import { useSearchParams, usePathname, useRouter } from "next/navigation";

import { BookDetailReviews } from "../../../utils/interfaces/review";

interface Props {
  reviewsData: BookDetailReviews;

}
export default function ReviewPaginatoin({ reviewsData }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const pages = Array.from({ length: reviewsData?.totalPages }, (_, i) => i + 1);

  const handleChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page <= 0) {
      params.set('page', '1');
    }
    if (page > reviewsData.totalPages) {
      params.set('page', reviewsData?.totalPages?.toString());
    }
    params.set('page', page.toString());
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <nav className="flex justify-center">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button onClick={() => handleChange(-1)} className="btn-style1 px-2 py-1 border-2 ">Previous</button>
        </li>
        {pages.map((pageNumber) => (
        <li key={pageNumber}>
          <button
            onClick={() => handleChange(pageNumber)}
            className="btn-style1 px-2 py-1 mx-2"
          >
            {pageNumber}
          </button>
        </li>
      ))}

        <li>
          <button onClick={() => handleChange(+1)} className="btn-style1 px-2 py-1 border-2">Next</button>
        </li>
      </ul>
    </nav>

  )
}
