import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";


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


];
const privateRoutes: Route[] = [];

export { publicRoutes, privateRoutes };