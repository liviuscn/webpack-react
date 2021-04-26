import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import edf from 'edf'
import scm from 'scm'
import skill from 'skill'
import NotFound from '@/components/NotFound'

export default (props) => {
    const [apps, setApps] = useState([])
    const { pathname } = useLocation();
    const { parentPath } = props;
    useEffect(() => {
        let arr = []
        if (!parentPath.includes("portal") && pathname.includes("portal")) {
            //门户页
            arr = [edf]
        } else {
            //非门户页
            arr = [scm, skill]
        }
        Promise.all(arr).then((res) => {
            let apps = []
            res.forEach((item) => {
                apps = [...apps, ...item]
            })
            setApps(apps)
        })
    }, [])
    const open_new_window_tab = (link, title, src) => {
        let url = `${window.location.origin}/#/${link}`
        if (src) {
            //如果是iframe直接打开iframe
            url = src.startsWith('/') ? `${window.location.origin}${src}` : src
        }
        try {
            window.open('javascript:window.name;', `<script>location.replace("${url}")</script>`);
        } catch (e) {
            window.open(url);
            // window.open(link, '', 'height=500,width=611,scrollbars=yes,status =yes')
        }
    }
    return apps.length > 0 ? <Switch>
        {
            apps.map(({ name, path, exact = false, component: Component }, index) => {
                return <Route
                    path={`${parentPath}${path}`}
                    exact={exact}
                    // component={component}
                    render={() => {
                        return <Component open_new_tab={props.open_new_tab || open_new_window_tab} />
                    }}
                    key={index}
                />
            })
        }
        <Route>
            <NotFound />
        </Route>
    </Switch> : null
}