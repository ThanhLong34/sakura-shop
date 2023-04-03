// Admin pages
import AdminDashboard from "@/admin/pages/Dashboard";
import AdminLogin from "@/admin/pages/Login";
import AdminNotFound from "@/admin/pages/NotFound";

// Browser pages
import BrowserDashboard from "@/browser/pages/Dashboard";
import BrowserNotFound from "@/browser/pages/NotFound";
import {
	DefaultLayout as BrowserDefaultLayout,
	EmptyLayout as BrowserEmptyLayout
} from '@/browser/layouts'

// Mobile pages
import MobileDashboard from "@/mobile/pages/Dashboard";
import MobileNotFound from "@/mobile/pages/NotFound";

const adminRoutes = [
	{
		path: "/admin/",
		component: AdminDashboard,
	},
	{
		path: "/admin/*",
		component: AdminNotFound,
	},
]

const browserRoutes = [
	{
		path: "/",
		component: BrowserDashboard,
		layout: BrowserDefaultLayout,
	},
	{
		path: "/admin/login",
		component: AdminLogin,
		layout: BrowserEmptyLayout,
	},
	{
		path: "/*",
		component: BrowserNotFound,
		layout: BrowserDefaultLayout,
	},
]

const mobileRoutes = [
	{
		path: "/app/",
		component: MobileDashboard,
	},
	{
		path: "/app/*",
		component: MobileNotFound,
	},
];

export { adminRoutes, browserRoutes, mobileRoutes };
