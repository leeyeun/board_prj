const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination-nav" >
            <ul className="pagination-ul">
                {pageNumbers.map(number => (
                    <li className="pagination-li" key={number}>
                        <span className="pagination-span" onClick={() => paginate(number)}>{number}</span>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Pagination;