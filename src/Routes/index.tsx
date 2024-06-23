/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLayout from "../layouts/MainLayout";
import AuthPage from "../pages/AuthPage";
import CartPage from "../pages/CartPage";
import ContactUs from "../pages/ContactUs";
import CouponPage from "../pages/CouponPage";
import DashBoardProduct from "../pages/DashBoardProduct";
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
        path: "/sign-up",
        component: AuthPage,
        layout: MainLayout,
    },
    {
        path: "/sign-in",
        component: AuthPage,
        layout: MainLayout,
    },
    {
        path: "/product/:productId",
        component: DetailPage,
        layout: MainLayout,
    },
    {
        path: "/dashboard",
        component: DashBoardProduct,
    },
];
const privateRoutes: Route[] = [

    {
        path: "/cart",
        component: CartPage,
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
    },];

export { privateRoutes, publicRoutes };
