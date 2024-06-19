/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLayout from "../layouts/MainLayout";
import AuthPage from "../pages/AuthPage";
import ContactUs from "../pages/ContactUs";
import CouponPage from "../pages/CouponPage";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import ShippingState from "../pages/ShippingState";
 // Updated import

interface Route {
    path: string;
    component: React.ComponentType<any>;
    layout?: React.ComponentType<any>;
}

const publicRoutes: Route[] = [
    {
        path: "/",
        component: HomePage,
        layout: MainLayout,
    },
    {
        path: "/couponpage",
        component: CouponPage,
        layout: MainLayout,
    },
    {
        path: "/shipping-state",
        component: ShippingState,
        layout: MainLayout,
    },
    {
        path: "/contact",
        component: ContactUs,
        layout: MainLayout,
    },
    {
        path: "/product",
        component: ProductPage,
        layout: MainLayout,
    },
    {
        path: "/detailpage",
        component: DetailPage,
        layout: MainLayout,
    },
    {
        path: "/sign-up",
        component: AuthPage,
        layout: MainLayout,
    },
    {
        path: "/sign-in",
        component: AuthPage,
        layout: MainLayout,
    },
];
const privateRoutes: Route[] = [];

export { privateRoutes, publicRoutes };
