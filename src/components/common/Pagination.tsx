import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageNumbers = () => {
        const pageNumbers: JSX.Element[] = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`text-sm font-semibold leading-6  ${currentPage === i ? 'w-10 h-10  bg-primary text-white' : 'w-10 h-10  text-gray-900 border-[1.5px] border-gray-100 hover:bg-gray-50 hover:border-[1.5px] hover:border-primary-500'
                        }`}
                    onClick={() => onPageChange(i)}
                >
                    0{i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex items-center justify-center ">
            <button
                className="w-10 h-10  border-[1.5px]  border-primary-500 flex items-center justify-center"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20.25 12H3.75" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.5 5.25L3.75 12L10.5 18.75" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <div className='flex'>
                {renderPageNumbers()}
            </div>

            <button
                className="w-10 h-10  border-[1.5px] border-primary-500 flex items-center justify-center"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3.75 12H20.25" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.5 5.25L20.25 12L13.5 18.75" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
