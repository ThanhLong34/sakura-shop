// Admin pages
import AdminLogin from "@/admin/pages/Login";
import AdminDashboard from "@/admin/pages/Dashboard";
import AdminGameConventionManagement from "@/admin/pages/GameConvention";
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
import AdminSurveyManagement from "@/admin/pages/Survey";
import AdminProfile from "@/admin/pages/Profile";
import AdminNotFound from "@/admin/pages/NotFound";

// Browser pages
import BrowserHome from "@/browser/pages/Home";
import BrowserDashboard from "@/browser/pages/Dashboard";
import BrowserClassicMode from "@/browser/pages/ClassicMode";
import BrowserOptionalMode from "@/browser/pages/OptionalMode";
import BrowserReward from "@/browser/pages/Reward";
import BrowserQuizAndAds from "@/browser/pages/QuizAndAds";
import BrowserSurvey from "@/browser/pages/Survey";
import BrowserProfile from "@/browser/pages/Profile";
import BrowserGameplay from "@/browser/pages/Gameplay";
import BrowserNotFound from "@/browser/pages/NotFound";
import { EmptyLayout as BrowserEmptyLayout } from "@/browser/layouts";

// Mobile pages
import MobileHome from "@/mobile/pages/Home";
import MobileDashboard from "@/mobile/pages/Dashboard";
import MobileClassicMode from "@/mobile/pages/ClassicMode";
import MobileOptionalMode from "@/mobile/pages/OptionalMode";
import MobileGameplay from "@/mobile/pages/Gameplay";
import MobileReward from "@/mobile/pages/Reward";
import MobileRewardHistory from "@/mobile/pages/RewardHistory";
import MobileQuizAndAds from "@/mobile/pages/QuizAndAds";
import MobileSurvey from "@/mobile/pages/Survey";
import MobileProfile from "@/mobile/pages/Profile";
import MobileNotFound from "@/mobile/pages/NotFound";
import { EmptyLayout as MobileEmptyLayout } from "@/mobile/layouts";

const adminRoutes = [
	{
		path: "/admin/login",
		redirect: "/admin/dashboard",
	},
	{
		path: "/admin/dashboard",
		component: AdminDashboard,
		metadata: {
			title: "Dashboard",
		},
	},
	{
		path: "/admin/game-convention",
		component: AdminGameConventionManagement,
		metadata: {
			tConvention: "Quy ước trò chơi",
		},
	},
	{
		path: "/admin/image-file",
		component: AdminImageFileManagement,
		metadata: {
			title: "Tệp hình ảnh",
		},
	},
	{
		path: "/admin/video-file",
		component: AdminVideoFileManagement,
		metadata: {
			title: "Tệp video",
		},
	},
	{
		path: "/admin/player",
		component: AdminPlayerManagement,
		metadata: {
			title: "Người chơi",
		},
	},
	{
		path: "/admin/level",
		component: AdminLevelManagement,
		metadata: {
			title: "Cấp độ",
		},
	},
	{
		path: "/admin/gift",
		component: AdminGiftManagement,
		metadata: {
			title: "Phần thưởng",
		},
	},
	{
		path: "/admin/topic",
		component: AdminTopicManagement,
		metadata: {
			title: "Chủ đề",
		},
	},
	{
		path: "/admin/card",
		component: AdminCardManagement,
		metadata: {
			title: "Thẻ bài",
		},
	},
	{
		path: "/admin/question",
		component: AdminQuestionManagement,
		metadata: {
			title: "Câu hỏi",
		},
	},
	{
		path: "/admin/advertisement-type",
		component: AdminAdvertisementTypeManagement,
		metadata: {
			title: "Loại quảng cáo",
		},
	},
	{
		path: "/admin/advertisement",
		component: AdminAdvertisementManagement,
		metadata: {
			title: "Quảng cáo",
		},
	},
	{
		path: "/admin/survey",
		component: AdminSurveyManagement,
		metadata: {
			title: "Khảo sát",
		},
	},
	{
		path: "/admin/profile",
		component: AdminProfile,
		metadata: {
			title: "Hồ sơ",
		},
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
		access: "public",
	},
	{
		path: "/dashboard",
		component: BrowserDashboard,
		access: "private",
	},
	{
		path: "/classic-mode",
		component: BrowserClassicMode,
		access: "private",
	},
	{
		path: "/optional-mode",
		component: BrowserOptionalMode,
		access: "private",
	},
	{
		path: "/gameplay/:topicId/:selectedLevel",
		component: BrowserGameplay,
		access: "private",
	},
	{
		path: "/reward",
		component: BrowserReward,
		access: "private",
	},
	{
		path: "/quiz-and-ads",
		component: BrowserQuizAndAds,
		access: "private",
	},
	{
		path: "/survey",
		component: BrowserSurvey,
		access: "private",
	},
	{
		path: "/profile",
		component: BrowserProfile,
		access: "private",
	},
	{
		path: "/admin/login",
		component: AdminLogin,
		layout: BrowserEmptyLayout,
		access: "public",
	},
	{
		path: "/*",
		component: BrowserNotFound,
		layout: BrowserEmptyLayout,
		access: "public",
	},
];

const mobileRoutes = [
	{
		path: "/",
		component: MobileHome,
		layout: MobileEmptyLayout,
		access: "public",
	},
	{
		path: "/dashboard",
		component: MobileDashboard,
		access: "private",
	},
	{
		path: "/classic-mode",
		component: MobileClassicMode,
		access: "private",
	},
	{
		path: "/optional-mode",
		component: MobileOptionalMode,
		access: "private",
	},
	{
		path: "/gameplay/:topicId/:selectedLevel",
		component: MobileGameplay,
		access: "private",
	},
	{
		path: "/reward",
		component: MobileReward,
		access: "private",
	},
	{
		path: "/reward-history",
		component: MobileRewardHistory,
		access: "private",
	},
	{
		path: "/quiz-and-ads",
		component: MobileQuizAndAds,
		access: "private",
	},
	{
		path: "/survey",
		component: MobileSurvey,
		access: "private",
	},
	{
		path: "/profile",
		component: MobileProfile,
		access: "private",
	},
	{
		path: "/*",
		component: MobileNotFound,
		layout: MobileEmptyLayout,
		access: "public",
	},
];

export { adminRoutes, browserRoutes, mobileRoutes };
