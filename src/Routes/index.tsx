import MainLayout from "../layouts/MainLayout";
import CouponPage from "../pages/CouponPage";
import HomePage from "../pages/HomePage";


interface Route {
    path: string;
    component: React.ComponentType<any>;
    layout?: React.ComponentType<any>;
}

const publicRoutes: Route[] = [
    {
        path: "/homepage",
        component: HomePage,
        layout: MainLayout, // khong co cung duoc , mac dinh la main layout
    },    
    {
        path: "/couponpage",
        component: CouponPage,
        layout: MainLayout, // khong co cung duoc , mac dinh la main layout
    },


];
const privateRoutes: Route[] = [];

export { publicRoutes, privateRoutes };