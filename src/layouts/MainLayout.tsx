import { Breadcrumb } from "../components/BreadCrumb";
import Footer from "./Footer";
import Header from "./Header";

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <Breadcrumb />
            <div className="px-[15rem] ">{children}</div>
            <Footer />
        </>
    )
}

export default MainLayout