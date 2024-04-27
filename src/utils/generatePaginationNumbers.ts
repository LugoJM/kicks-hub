
export const generatePagination = (currentPage : number, totalPages : number) => {

    /* If the total of pages is less or equal to 5 we show all the pages */
    if(totalPages <= 5)
        return Array.from({length : totalPages}, (_, i) => i+1);

    /* If the current page is between the first 3 we show => [1,2,3,...,{totalPages -1},{totalPages}]  */
    if(currentPage <= 3)
        return [1,2,3,"...", totalPages-1, totalPages]

    /* If the current page is between the last 3 pages we show => [1,2,...,{totalPages - 2},{totalPages - 1},{totalPages}]  */
    if(currentPage >= totalPages - 2)
        return [1,2, "...", totalPages - 2, totalPages - 1, totalPages];

    /* If the current page is somewhere else we show => [1,...,{currentPage - 1}, {currentPage},{ currentPage + 1}, ..., { totalPages }]  */
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
   
};