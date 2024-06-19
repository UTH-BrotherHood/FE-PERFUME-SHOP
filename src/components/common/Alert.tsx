interface IAlert {
    variant?: "success" | "warning" | "danger";
    children: React.ReactNode;
}

const Alert = ({ variant, children }: IAlert) => {
    let alertClass = "";
    let icon = null;

    switch (variant) {
        case "success":
            alertClass = "rounded-md border-success bg-success-50";
            icon = (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M11.5625 6.5625L4.6875 13.4375L1.25 10" stroke="#2DB324" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.75 6.5625L11.875 13.4375L10.0469 11.6094" stroke="#2DB324" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
            break;
        case "warning":
            alertClass = "bg-warning-50 rounded-md border-warning ";
            icon = (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" stroke="#EBC80C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 6.25V10.625" stroke="#EBC80C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 14.375C10.5178 14.375 10.9375 13.9553 10.9375 13.4375C10.9375 12.9197 10.5178 12.5 10 12.5C9.48223 12.5 9.0625 12.9197 9.0625 13.4375C9.0625 13.9553 9.48223 14.375 10 14.375Z" fill="#EBC80C" />
                </svg>
            );
            break;
        case "danger":
            alertClass = "bg-danger-50 rounded-md border-danger";
            icon = (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 8.125V11.25" stroke="#EE5858" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.92187 3.12501L2.04687 15C1.93734 15.1897 1.87959 15.4049 1.8794 15.6239C1.8792 15.843 1.93657 16.0582 2.04576 16.2481C2.15495 16.438 2.31212 16.5959 2.50154 16.7059C2.69095 16.8159 2.90595 16.8742 3.12499 16.875H16.875C17.094 16.8742 17.309 16.8159 17.4984 16.7059C17.6879 16.5959 17.845 16.438 17.9542 16.2481C18.0634 16.0582 18.1208 15.843 18.1206 15.6239C18.1204 15.4049 18.0626 15.1897 17.9531 15L11.0781 3.12501C10.9694 2.93507 10.8125 2.77721 10.6231 2.66742C10.4338 2.55764 10.2188 2.49982 9.99999 2.49982C9.78114 2.49982 9.56617 2.55764 9.37685 2.66742C9.18753 2.77721 9.03057 2.93507 8.92187 3.12501V3.12501Z" stroke="#EE5858" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 15C10.5178 15 10.9375 14.5803 10.9375 14.0625C10.9375 13.5447 10.5178 13.125 10 13.125C9.48223 13.125 9.0625 13.5447 9.0625 14.0625C9.0625 14.5803 9.48223 15 10 15Z" fill="#EE5858" />
                </svg>
            );
            break;
        default:
            alertClass = "bg-green-500 hover:bg-green-700 text-white";
            break;
    }

    return (
        <div className={`inline-flex items-start border-2 justify-center px-4 py-3 gap-40 ${alertClass}`}>
            <div className="text-sm font-normal leading-5">{children}</div>
            {icon}
        </div>
    );
};

export default Alert;
