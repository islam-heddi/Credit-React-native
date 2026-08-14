import { IMoney } from "@/types/Money";


const pagination = (page: number, table: IMoney[]) => {
    const pageSize = 10;
    const currentPage = Math.max(1, page);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return table.slice(startIndex, endIndex);
}

const numberOfPage = (table: IMoney[]): number => {
    const pageSize = 10;
    const numberPages = table.length / pageSize;
    return numberPages + table.length % pageSize;
}


export {
    numberOfPage, pagination
};
