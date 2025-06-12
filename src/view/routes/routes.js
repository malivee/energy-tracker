import AnalysisPage from "../analysis/analysis-page.js";
import DashboardPage from "../dashboard/dashboard-page.js";
import HomePage from "../home/home-page.js";


const routes = {
    '/' : new HomePage(),
    '/dashboard': new DashboardPage(),
    '/analysis': new AnalysisPage(),

}
export default routes;