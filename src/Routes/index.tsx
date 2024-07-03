/* eslint-disable @typescript-eslint/no-explicit-any */
import AddressPage from "../pages/AddressPage";
import BlankLayout from "../layouts/BlankLayout";
import DashBoardLayout from "../layouts/DashBoardLayout";
import DashBoardUser from "../layouts/DashboardUser";
import MainLayout from "../layouts/MainLayout";
import AddCategory from "../pages/AddCetegory";
import AddProduct from "../pages/AddProduct";
import AuthPage from "../pages/AuthPage";
import CartPage from "../pages/CartPage";
import ContactUs from "../pages/ContactUs";
import CouponPage from "../pages/CouponPage";
import DashBoard from "../pages/DashBoard";
import DashBoardCategories from "../pages/DashBoardCategories";
import DashBoardProduct from "../pages/DashBoardProduct";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";
import OrderHistory from "../pages/OrderHistory";
import ProductPage from "../pages/ProductPage";
import ProductUpdateForm from "../pages/ProductUpdateForm";
import ProfilePage from "../pages/ProfilePage";
import ShippingState from "../pages/ShippingState";
import VerifyEmail from "../pages/VerifyEmail";
import WishList from "../pages/WishList";
import BillingPage from "../pages/BillingPage";
import CategoryUpdateForm from "../pages/CategoryUpdateForm";

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
        path: "/dashboard/products",
        component: DashBoardProduct,
        layout: DashBoardLayout,
    },
    {
        path: "/dashboard/categories",
        component: DashBoardCategories,
        layout: DashBoardLayout,
    },
    {
        path: "/dashboard",
        component: DashBoard,
        layout: DashBoardLayout,
    },
    {
        path: "/dashboard/products/AddProduct",
        component: AddProduct,
        layout: DashBoardLayout,
    },
    {
        path: "/dashboard/categories/AddCategory",
        component: AddCategory,
        layout: DashBoardLayout,
    },
    {
        path: "/dashboard/categories/:idUpdateCategory",
        component: CategoryUpdateForm,
        layout: DashBoardLayout,
    },
     {
        path: "/dashboard/products/:idUpdateProduct",
        component: ProductUpdateForm,
        layout: DashBoardLayout,
    },
   
    {
        path: "/wishlist",
        component: WishList,
        layout: DashBoardUser
    },
    {
        path: "/orderhistory",
        component: OrderHistory,
        layout: DashBoardUser
    },
    {
        path: "/MyAccount",
        component: ProfilePage,
        layout: DashBoardUser
    },
    {
        path: "/address",
        component: AddressPage,
        layout: DashBoardUser
    },

    {
        path: "/address/billing-address",
        component: BillingPage,
        layout: MainLayout
    },
];

export { privateRoutes, publicRoutes };
