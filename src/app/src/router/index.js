// Admin pages
import AdminDashboard from "@/admin/pages/Dashboard";
import AdminLogin from "@/admin/pages/Login";
import AdminNotFound from "@/admin/pages/NotFound";

// Browser pages
import BrowserDashboard from "@/browser/pages/Dashboard";
import BrowserNotFound from "@/browser/pages/NotFound";
import { EmptyLayout as BrowserEmptyLayout } from "@/browser/layouts";

// Mobile pages
import MobileDashboard from "@/mobile/pages/Dashboard";
import MobileNotFound from "@/mobile/pages/NotFound";

const adminRoutes = [
	{
		path: "/admin/login",
		redirect: "/admin/dashboard",
	},
	{
		path: "/admin/dashboard",
		component: AdminDashboard,
		metadata: {
			title: 'Dashboard'
		}
	},
	{
		path: "/*",
		component: AdminNotFound,
	},
];

const browserRoutes = [
	{
		path: "/",
		component: BrowserDashboard,
	},
	{
		path: "/admin/login",
		component: AdminLogin,
		layout: BrowserEmptyLayout,
	},
	{
		path: "/*",
		component: BrowserNotFound,
	},
];

const mobileRoutes = [
	{
		path: "/",
		component: MobileDashboard,
	},
	{
		path: "/*",
		component: MobileNotFound,
	},
];

export { adminRoutes, browserRoutes, mobileRoutes };
