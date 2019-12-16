import { EventEmitter } from 'events';
import { Type } from '../containers/Navbar/Navbar.enum';
import Dispatcher from './dispatcher';
import Constants from './constants';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddIcon from '@material-ui/icons/Add';
import { navbarConfig } from '../containers/Navbar/navbarPrototypes';
const _store = {
    menuVisible: false,
    navItems: navbarConfig,
};

class Store extends EventEmitter {
    constructor() {
        super();

        this.registerToActions = this.registerToActions.bind(this);
        this.toggleSidebar = this.toggleSidebar.bind(this);

        Dispatcher.register(this.registerToActions.bind(this));
    }

    registerToActions({ actionType, payload }) {
        switch (actionType) {
            case Constants.TOGGLE_SIDEBAR:
                this.toggleSidebar();
                break;
            default:
        }
    }

    toggleSidebar() {
        _store.menuVisible = !_store.menuVisible;
        this.emit(Constants.CHANGE);
    }

    getMenuState() {
        return _store.menuVisible;
    }

    getSidebarItems() {
        return _store.navItems;
    }

    addChangeListener(callback) {
        this.on(Constants.CHANGE, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(Constants.CHANGE, callback);
    }
}

export default new Store();
