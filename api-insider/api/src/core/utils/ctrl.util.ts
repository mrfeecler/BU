export class CtrlUtil {
  public static getPublicApi() {
    return ['auth/login', 'auth/logout', 'seed', 'coins'];
  }
 
  public static getPagingFormat(
    data: any,
    page: number,
    perPage: number,
    total: number,
  ) {
    return {
      total,
      data,
      page,
      perPage,
    };
  }

  public static applyPaginationCursor(
    limit: number = 10,
    page: number = 1,
    data: any,
  ) {
    const startIndex = (page - 1) * limit ? 1 : (page - 1) * limit;
    const endIndex = page * limit;
    const result = {
      next: {},
      previous: {},
      items: {},
    };
    if (endIndex < data.length) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    result.items = data.slice(startIndex, startIndex + limit);
    return result;
  }

  public static applySearch(search_key: string, field: string, datas: any) {
    if (search_key && datas) {
      datas.filter((x: any) => x[field].toLowerCase().includes(search_key.toLowerCase()))
    }
    return datas;
  }

  public static applySearchQuery(
    search_key: string,
    searchField: string,
    query: any,
  ) {
    if (search_key && searchField) {
      const keys = search_key.split(',');
      if (keys.length > 1) {
        query.andWhere(`"${searchField}" IN (:...keys)`, { keys });
      } else {
        query.andWhere(`"${searchField}" = :key`, { key: keys[0] });
      }
    }
  }

  public static applyPaginationQuery(limit: number, page: number, query: any) {
    const offset = (page - 1) * limit;
    query.limit(limit).offset(offset);
  }

  public static applyPagination(
    limit: number = 10,
    page: number = 1,
    datas: any,
  ) {
    if (datas) {
      const offset = (page - 1) * limit;
      const paginatedData = datas.slice(offset, offset + limit);
      return paginatedData;
    }
  }

  public static applySortQuery(
    sortBy: string,
    sortOrderFirst: 'asc' | 'desc',
    queryBuilder: any,
    sortOrder2?: string,
  ) {
    const sortOrderSecond = sortOrder2 ? sortOrder2 : sortOrderFirst;
    if (sortBy && sortOrderFirst) {
      if (sortBy.includes(',')) {
        const firstSortItem = sortBy.split(',')[0];
        const secondSortItem = sortBy.split(',')[1];
        queryBuilder.orderBy(
          `"${firstSortItem}"`,
          sortOrderFirst.toUpperCase(),
          'NULLS LAST',
        );
        queryBuilder.addOrderBy(
          `"${secondSortItem}"`,
          sortOrderSecond.toUpperCase(),
          'NULLS LAST',
        );
      } else {
        if (sortBy.includes('.')) {
          queryBuilder.orderBy(sortBy, sortOrderFirst.toUpperCase(), 'NULLS LAST');
        } else {
          queryBuilder.orderBy(
            `"${sortBy}"`,
            sortOrderFirst.toUpperCase(),
            'NULLS LAST',
          );
        }
      }
    }
  }

  public static applySort(
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    datas: any,
  ) {
    if (sortBy && sortOrder && datas && Array.isArray(datas)) {
      datas.sort((a: any, b: any) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (aValue === 0) return 1;
        if (bValue === 0) return -1;
        if (sortOrder === 'asc') {
          if (aValue < bValue) return -1;
          if (aValue > bValue) return 1;
          return 0;
        } else {
          if (aValue > bValue) return -1;
          if (aValue < bValue) return 1;
          return 0;
        }
      });
    }
    return datas;
  }

  public static applyFilter(keySearch: string, value: string, datas: any) {
    const filteredData = datas.filter((data: any) => {
      if (data[keySearch] && typeof data[keySearch] === 'string') {
        return data[keySearch].toLowerCase().includes(value.toLowerCase());
      }
      return false;
    });
    return filteredData;
  }
}
