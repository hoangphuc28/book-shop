import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Sort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const sort = searchParams.get('sort');
  const parsedSort = sort ? parseInt(sort) : 0;
  const handleSelectSortType = (event: SelectChangeEvent) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('category', value)
    }

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <FormControl size="small" variant="filled" sx={{ m: 1, minWidth: 120 , margin:0}}>
       <InputLabel id="demo-simple-select-filled-label">Sort By</InputLabel>
    <Select
      sx={{ fontSize: 14 }}
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={parsedSort.toString()}
      onChange={handleSelectSortType}
    >
      <MenuItem value={1}>Price Low To High</MenuItem>
      <MenuItem value={2}>Price High To Low</MenuItem>
      <MenuItem value={3}>Popularity</MenuItem>
    </Select>
  </FormControl>
  )
}
