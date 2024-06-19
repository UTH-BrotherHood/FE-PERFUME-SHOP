/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLayout from "../layouts/MainLayout";
import ContactUs from "../pages/ContactUs";
import CouponPage from "../pages/CouponPage";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import ShippingState from "../pages/ShippingState";
import SignUpPage from "../pages/SignUpPage";

interface Route {
    path: string;
    component: React.ComponentType<any>;
    layout?: React.ComponentType<any>;
}

const publicRoutes: Route[] = [
    {
        path: "/",
        component: HomePage,
        layout: MainLayout, // khong co cung duoc , mac dinh la main layout
    },
    {
        path: "/couponpage",
        component: CouponPage,
        layout: MainLayout, // khong co cung duoc , mac dinh la main layout
    },
    {
        path: "/shipping-state",
        component: ShippingState,
        layout: MainLayout, // khong co cung duoc , mac dinh la main layout
    },
    {
        path: "/contact",
        component: ContactUs,
        layout: MainLayout, // khong co cung duoc , mac dinh la main layout
    },
    {
        path: "/product",
        component: ProductPage,
        layout: MainLayout, // khong co cung duoc , mac dinh la main layout
    },
    {
        path: "/detailpage",
        component: DetailPage,
        layout: MainLayout, // khong co cung duoc , mac dinh la main layout
    },
    {
        path: "/sign-up",
        component: SignUpPage,
        layout: MainLayout, // khong co cung duoc , mac dinh la main layout
    },
];
const privateRoutes: Route[] = [];

export { privateRoutes, publicRoutes };
