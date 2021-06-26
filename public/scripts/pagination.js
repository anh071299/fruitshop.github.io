let toPrevPage = (link, current) => {
    return `
        <li class="page-item ${current == 1 ? "disabled" : ""}">
            <a class="page-link" href="${link}"> <span aria-hidden="true">&laquo;</span></a>
        </li>    
    `;
};

let toNextPage = (link, current, totalPage) => {
    return `
        <li class="page-item ${current == totalPage ? "disabled" : ""}">
            <a class="page-link" href="${link}"><span aria-hidden="true">&raquo;</span></a>
        </li>    
    `;
};

let currentPage = (current) => {
    return `
        <li class="page-item active">
            <a class="page-link">${current}</a>
        </li>
    `;
};

let prevPage = (current) => {
    let rt = "";
    for(let page = 1; page < current; page++){

        rt += `
        <li class="page-item">
            <a class="page-link" href="?_page=${page}&_limit=6>">${page}</a>
        </li>
    `
    }
    return rt;
};

let nextPage = (current, totalPage) => {
    let rt = "";
    for(let page = current + 1; page <= totalPage; page++){

        rt += `
        <li class="page-item">
            <a class="page-link" href="?_page=${page}&_limit=6>">${page}</a>
        </li>
    `
    }
    return rt;
};

export default function ({ prev, next }, current, totalPage) {
    return `
        <ul class="pagination">
            ${toPrevPage(prev, current)}

            ${prevPage(current)}

            ${currentPage(current)}

            ${nextPage(current, totalPage)}

            ${toNextPage(next, current, totalPage)}
        </ul>
    `;
}
