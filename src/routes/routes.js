import config from '../config';

// pages
import Forecast from '../pages/Forecast';

const publicRoutes = [{ path: config.routes.forecast, component: Forecast, layout: null }];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
