/* eslint-disable @typescript-eslint/no-explicit-any */
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import AuthPage from "../pages/AuthPage";
import CartPage from "../pages/CartPage";
import ContactUs from "../pages/ContactUs";
import CouponPage from "../pages/CouponPage";
import DashBoardProduct from "../pages/DashBoardProduct";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import OrderHistory from "../pages/OrderHistory";
import ProductPage from "../pages/ProductPage";
import ProfilePage from "../pages/ProfilePage";
import ShippingState from "../pages/ShippingState";
import TestCaiDauBuoiToast from "../pages/TestCaiDauBuoiToast";
import VerifyEmail from "../pages/VerifyEmail";
import WishList from "../pages/WishList";

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
        path: "/verify-email",
        component: VerifyEmail,
        layout: BlankLayout,
    },
    {
        path: "TestCaiDauBuoiToast",
        component: TestCaiDauBuoiToast,
        layout: BlankLayout,
    },
    {
        path: "/dashboard",
        component: DashBoardProduct,
    },
    {
        path: "/cart",
        component: CartPage,
        layout: MainLayout,
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
    },

    {
        path: "/MyAccount",
        component: ProfilePage,
    },
    {
        path: "/orderhistory",
        component: OrderHistory,
    },
    {
        path: "/wishlist",
        component: WishList,
    },

];

export { privateRoutes, publicRoutes };
