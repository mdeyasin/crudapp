import React from 'react';

class Pagination extends React.Component {

    render() {
        const currentPage = this.props.currentPage;
        const totalPage = this.props.totalPage;
        const perPage = this.props.perPage;
        const pageCount = Math.ceil(totalPage/perPage);
        let paginationHtml = [];
        console.log(totalPage);
        if (totalPage > 0) {
            if (currentPage - 1 <= 0) {
                paginationHtml.push('<li className="page-item disabled" aria-disabled="true" aria-label="previous">');
                paginationHtml.push('<span className="page-link mr-4" aria-hidden="true">Previous</span></li>');
            } else {
                paginationHtml.push('<li className="page-item"><a className="page-link mr-4" href="" rel="prev" aria-label="previous">Previous</a></li>');
            }

            if (totalPage > 1) {
                for (let i = 0; i < pageCount ; i++) {
                    if (i === currentPage)
                         paginationHtml.push('<li class="page-item active" aria-current="page"><span className="page-link">{i}</span></li>');
                    else
                        paginationHtml.push('<li className="page-item"><a className="page-link" href="">{i}</a></li>');
                }
            }

            if (currentPage + 1 < totalPage) {
                paginationHtml.push('<li className="page-item"><a className="page-link ml-4" href="" rel="next" aria-label="next">Next</a></li>');
            } else {
                paginationHtml.push('<li class="page-item disabled" aria-disabled="true" aria-label="next"><span className="page-link ml-4" aria-hidden="true">Next</span></li>');
            }
        }
        return (paginationHtml.join());

    }
}

export default Pagination
