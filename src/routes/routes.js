import config from '../config';

// pages
import Forecast from '../pages/Forecast';
import CRUD from '../pages/CRUD/CRUD';
import Home from '../pages/Home/Home';
import DefaultLayout from '../layouts/DefaultLayout/DefaultLayout';

const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.forecast, component: Forecast, layout: DefaultLayout },
    { path: config.routes.crud, component: CRUD, layout: DefaultLayout },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
