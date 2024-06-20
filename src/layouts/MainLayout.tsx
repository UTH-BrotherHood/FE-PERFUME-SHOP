import { Breadcrumb } from "../components/BreadCrumb";
import Footer from "./Footer";
import Header from "./Header";

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div className="mt-6">   <Breadcrumb /></div>
         
            <div >{children}</div>
            <Footer />
        </>
    )
}

export default MainLayout