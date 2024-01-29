import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import Menu, { MenuItem } from './Menu';
import config from './config';
import {
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
} from './components/Icons';
import SuggestAcounts from './components/SuggestAcounts';
import { useState, useEffect } from 'react';
import * as searchService from './services/searchService';

const cx = classNames.bind(styles);

function Sidebar() {
    const [dataUser, setDataUser] = useState([]);

    useEffect(() => {
        searchService
            .search('n')
            .then((result) => setDataUser(result))
            .catch((error) => console.error(error));
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="Live" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            <SuggestAcounts tooltip lable="Suggest acounts" data={dataUser} />
            <SuggestAcounts lable="Following acounts" data={dataUser} />
        </aside>
    );
}

export default Sidebar;
