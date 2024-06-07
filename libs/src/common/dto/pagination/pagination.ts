// src/common/dto/pagination.dto.ts
export class PaginationResultDto<T> {
  readonly items: T[];
  readonly total: number;
  readonly currentPage: number;
  readonly itemsPerPage: number;
  readonly totalPage: number

  constructor(items: T[], total: number, currentPage?: number, itemsPerPage?: number) {
    if (typeof currentPage === 'string') {
      currentPage = parseInt(currentPage);
    }
    if (typeof itemsPerPage === 'string') {
      itemsPerPage = parseInt(itemsPerPage);
    }
    this.currentPage = currentPage !== undefined ? currentPage : 1;
    this.itemsPerPage = itemsPerPage !== undefined ? itemsPerPage : items.length;
    this.items = items;
    this.total = total;
    this.totalPage = Math.ceil(this.total / this.itemsPerPage);
  }
}
