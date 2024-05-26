import Footer from "./Footer";
import Header from "./Header";

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    )
}

export default MainLayout