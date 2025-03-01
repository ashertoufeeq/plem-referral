export interface ApiResponse<T> {
    message: string;
    statusCode: number;
    data: PagedData<T>;
  }
  
  interface PagedData<T> {
    content: T;
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    empty: boolean;
  }
  
  interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  }
  
  interface Sort {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  }
  