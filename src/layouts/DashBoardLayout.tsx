import { useLocation } from 'react-router-dom';

function DashBoardLayout({ children }: { children: React.ReactNode }) {
    const location = useLocation();

    return (
        <div className="flex w-full gap-10">
            <div className="w-1/5 p-5 text-white shadow-xl h-screen fixed">
                <ul className="text-black">
                    <p className="text-4xl text-center mb-6">Perfume Shop</p>
                    <li className="mb-4">
                        <a href="/dashboard/" className={`block py-2 px-4 rounded ${location.pathname === '/dashboard/' ? 'bg-primary text-white' : ''}`}>
                            Home
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="/dashboard/products" className={`block py-2 px-4 rounded ${location.pathname.includes('/dashboard/products') ? 'bg-primary text-white' : ''}`}>
                            Products
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="/dashboard/categories" className={`block py-2 px-4 rounded ${location.pathname.includes('/dashboard/categories') ? 'bg-primary text-white' : ''}`}>
                            Categories
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-5 bg-white ml-[20%]">
                {children}
            </div>
        </div>
    );
}

export default DashBoardLayout;
