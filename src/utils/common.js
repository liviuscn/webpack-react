import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
/* 
    税局使用的跳转方法，直接打开url会报错
    //let url = 'https://etax.shanghai.chinatax.gov.cn/wszx-web/bszm/apps/views/beforeLogin/indexBefore/pageIndex.html'
*/
export function open_new_window_tab(link) {
    try {
        window.open('javascript:window.name;', '<script>location.replace("' + link + '")</script>');
    } catch (e) {
        window.open(link);
        // window.open(link, '', 'height=500,width=611,scrollbars=yes,status =yes')
    }
}

/**
 * 打开新的tab
 */
export function open_new_tab() {
    const history = useHistory();
    const { path, url } = useRouteMatch();
    const { pathname } = useLocation();
    const dispatch = useDispatch()
    const { panes, menus, currentPane } = portalState;
    onclose.log(currentPane,'1111111111111111111111')
}