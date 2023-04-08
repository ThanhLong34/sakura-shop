// Admin pages
import AdminLogin from "@/admin/pages/Login";
import AdminDashboard from "@/admin/pages/Dashboard";
import AdminImageFileManagement from "@/admin/pages/ImageFile";
import AdminPlayerManagement from "@/admin/pages/Player";
import AdminProfile from "@/admin/pages/Profile";
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
		path: "/admin/image-file",
		component: AdminImageFileManagement,
		metadata: {
			title: 'Tệp hình ảnh'
		}
	},
	{
		path: "/admin/player",
		component: AdminPlayerManagement,
		metadata: {
			title: 'Người chơi'
		}
	},
	{
		path: "/admin/profile",
		component: AdminProfile,
		metadata: {
			title: 'Hồ sơ'
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
