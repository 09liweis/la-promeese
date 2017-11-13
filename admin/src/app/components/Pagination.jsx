import React from 'react';
import { Link } from 'react-router-dom';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalStudents: props.totalStudents
        };
    }
    render() {
        const searchQuery = this.props.searchQuery;
        const totalStudents = this.state.totalStudents;
        const totalPages = Math.ceil(totalStudents / this.props.studentsPerPage );
        const pagination = Array(totalPages).fill().map((x, i) => {
            const currentClass = (this.props.currentPage - 1) == i ? 'pagination-link is-current' : 'pagination-link';
            return (
                <li key={i}>
                    <Link className={currentClass} to={`/admin/students?page=${i+1}${searchQuery}`} aria-label="Page {i+1}" aria-current="page">{i+1}</Link>
                </li>
            );
        });
        return (
            <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                <Link className="pagination-previous" to={`/admin/students?page=1${searchQuery}`}>第一页</Link>
                <Link className="pagination-next" to={`/admin/students?page=${totalPages}${searchQuery}`}>最后一页</Link>
                <ul className="pagination-list">
                {pagination}
                </ul>
            </nav>
        );
    }
}

export default Pagination;