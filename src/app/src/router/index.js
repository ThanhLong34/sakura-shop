import Home from "@/pages/Home";
import About from "@/pages/About";
import Shop from "@/pages/Shop";
import NotFound from "@/pages/NotFound";

const routes = [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/about",
		component: About,
	},
	{
		path: "/shop",
		component: Shop,
	},
	{
		path: "/*",
		component: NotFound,
	},
];

export { routes };
