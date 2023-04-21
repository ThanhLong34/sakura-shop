// Admin pages
import AdminLogin from "@/admin/pages/Login";
import AdminDashboard from "@/admin/pages/Dashboard";
import AdminGameDataManagement from "@/admin/pages/GameData";
import AdminImageFileManagement from "@/admin/pages/ImageFile";
import AdminVideoFileManagement from "@/admin/pages/VideoFile";
import AdminPlayerManagement from "@/admin/pages/Player";
import AdminLevelManagement from "@/admin/pages/Level";
import AdminGiftManagement from "@/admin/pages/Gift";
import AdminTopicManagement from "@/admin/pages/Topic";
import AdminCardManagement from "@/admin/pages/Card";
import AdminQuestionManagement from "@/admin/pages/Question";
import AdminAdvertisementTypeManagement from "@/admin/pages/AdvertisementType";
import AdminAdvertisementManagement from "@/admin/pages/Advertisement";
import AdminProfile from "@/admin/pages/Profile";
import AdminNotFound from "@/admin/pages/NotFound";

// Browser pages
import BrowserHome from "@/browser/pages/Home";
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
		path: "/admin/game-data",
		component: AdminGameDataManagement,
		metadata: {
			title: 'Dữ liệu trò chơi'
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
		path: "/admin/video-file",
		component: AdminVideoFileManagement,
		metadata: {
			title: 'Tệp video'
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
		path: "/admin/level",
		component: AdminLevelManagement,
		metadata: {
			title: 'Cấp độ'
		}
	},
	{
		path: "/admin/gift",
		component: AdminGiftManagement,
		metadata: {
			title: 'Phần thưởng'
		}
	},
	{
		path: "/admin/topic",
		component: AdminTopicManagement,
		metadata: {
			title: 'Chủ đề'
		}
	},
	{
		path: "/admin/card",
		component: AdminCardManagement,
		metadata: {
			title: 'Thẻ bài'
		}
	},
	{
		path: "/admin/question",
		component: AdminQuestionManagement,
		metadata: {
			title: 'Câu hỏi'
		}
	},
	{
		path: "/admin/advertisement-type",
		component: AdminAdvertisementTypeManagement,
		metadata: {
			title: 'Loại quảng cáo'
		}
	},
	{
		path: "/admin/advertisement",
		component: AdminAdvertisementManagement,
		metadata: {
			title: 'Quảng cáo'
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
		component: BrowserHome,
		layout: BrowserEmptyLayout,
		access: 'public'
	},
	{
		path: "/dashboard",
		component: BrowserDashboard,
		access: 'private'
	},
	{
		path: "/admin/login",
		component: AdminLogin,
		layout: BrowserEmptyLayout,
		access: 'public'
	},
	{
		path: "/*",
		component: BrowserNotFound,
		layout: BrowserEmptyLayout,
		access: 'public'
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
