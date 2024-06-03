'use client'
import { FormControl, Icon, IconButton, MenuItem, Select, SelectChangeEvent, TablePagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Fragment } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
interface Props {
  totalPage: number
  totalItem: number,
  currentPage: number,
  itemsPerPage: number
}
export default function Pagination({ totalPage, totalItem, currentPage, itemsPerPage }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();


  const handleChangePage = (
    newPage: number,
  ) => {
    const params = new URLSearchParams(searchParams);
    if (newPage <= 0) {
      params.set('page', '1');
    }
    if (newPage > totalPage) {
      params.set('page', totalPage.toString());
    }
    params.set('page', newPage.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handleChangeRowsPerPage = (
    event: SelectChangeEvent
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set('limit', event.target.value);
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Fragment>

      <div className="flex">
        <div className="flex items-center mr-2">
          <p className="mr-2">Row per page: </p>
          <FormControl variant="standard" size="small">
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
              sx={{ fontSize: 14 }}
              value={itemsPerPage.toString()}
              onChange={handleChangeRowsPerPage}
            >
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={16}>16</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex items-center ml-2">
          <div>
            {Math.min(itemsPerPage * currentPage - itemsPerPage + 1, totalItem)}-
            {Math.min(itemsPerPage * currentPage, totalItem)} of {totalItem}
          </div>
          <div>
            <IconButton disabled={currentPage <= 1} onClick={() => handleChangePage(currentPage - 1)}>
              <ArrowBackIosIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton disabled={currentPage > totalPage - 1} onClick={() => handleChangePage(currentPage + 1)}>
              <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </div>
        </div>

      </div>
    </Fragment>

  );
}
