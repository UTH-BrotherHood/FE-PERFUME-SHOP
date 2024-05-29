/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
    label: string;
    link: string;
}

export const Breadcrumb: React.FC = () => {
    const { pathname } = useLocation();
    const pathnames = pathname.split('/').filter((x) => x);
    let breadcrumbItems: BreadcrumbItem[] = [];

    // Kiểm tra nếu đang ở trang Home thì không render breadcrumb
    if (pathnames.length === 0) {
        return null;
    }

    pathnames.reduce((prevPath, currPath) => {
        const path = `${prevPath}/${currPath}`;
        breadcrumbItems.push({
            label: currPath.charAt(0).toUpperCase() + currPath.slice(1), // Chữ cái đầu tiên viết hoa
            link: path === "" ? "/" : path // Đường dẫn
        });
        return path;
    }, "");

    return (
        <div className="flex items-center justify-center px-40 text-sm ">
            <Link to={"/"} className="text-gray-600 font-normal flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M11.875 16.2498V12.4998C11.875 12.334 11.8092 12.1751 11.6919 12.0579C11.5747 11.9406 11.4158 11.8748 11.25 11.8748H8.75C8.58424 11.8748 8.42527 11.9406 8.30806 12.0579C8.19085 12.1751 8.125 12.334 8.125 12.4998V16.2498C8.125 16.4156 8.05915 16.5745 7.94194 16.6917C7.82473 16.809 7.66576 16.8748 7.5 16.8748H3.75C3.58424 16.8748 3.42527 16.809 3.30806 16.6917C3.19085 16.5745 3.125 16.4156 3.125 16.2498V9.02324C3.1264 8.93674 3.14509 8.8514 3.17998 8.77224C3.21486 8.69308 3.26523 8.6217 3.32812 8.5623L9.57812 2.88261C9.69334 2.77721 9.84384 2.71875 10 2.71875C10.1562 2.71875 10.3067 2.77721 10.4219 2.88261L16.6719 8.5623C16.7348 8.6217 16.7851 8.69308 16.82 8.77224C16.8549 8.8514 16.8736 8.93674 16.875 9.02324V16.2498C16.875 16.4156 16.8092 16.5745 16.6919 16.6917C16.5747 16.809 16.4158 16.8748 16.25 16.8748H12.5C12.3342 16.8748 12.1753 16.809 12.0581 16.6917C11.9408 16.5745 11.875 16.4156 11.875 16.2498Z" stroke="#5F6C72" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg> Home
            </Link>
            {
                breadcrumbItems.map((item, index) => {
                    const isLast = index === breadcrumbItems.length - 1;
                    const key = `breadcrumb-${item.label}-${index}`;
                    return isLast ? (
                        <span className="text-secondary-500 font-medium" key={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline-block mx-2 w-3 h-3 stroke-current text-gray-400">
                                <path d="M4.5 2.25L8.25 6L4.5 9.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>{item.label}
                        </span>
                    ) : (
                        <span className="text-gray-600 font-normal" key={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className="inline-block mx-2 w-3 h-3 stroke-current text-gray-400">
                                <path d="M4.5 2.25L8.25 6L4.5 9.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <Link to={item.link}>{item.label}</Link>
                        </span>
                    )
                })
            }
        </div>
    )
}
