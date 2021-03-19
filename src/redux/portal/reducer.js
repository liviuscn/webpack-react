import * as types from './actionType'
import update from "immutability-helper";
import session from '@/utils/session'

const initialState = {
    panes: [{
        title: '工作台',
        content: '工作台',
        key: '/portal/home',
        closable: false
    },]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.INCREMENT_PANES: {
            let TABS_DATA = update(state, {
                panes: { $set: action.payload }
            });
            session.setItem('TABS_DATA', TABS_DATA)
            return TABS_DATA;
        }
        default: {
            let TABS_DATA = session.getItem('TABS_DATA')
            if (TABS_DATA) {
                return TABS_DATA
            }
            return state
        }
    }
}