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

    return apps.length > 0 ? <Switch>
        {
            apps.map(({ name, path, exact = false, component }, index) => {
                return <Route
                    path={`${parentPath}${path}`}
                    exact={exact}
                    component={component}
                    key={index}
                />
            })
        }
        <Route>
            <NotFound />
        </Route>
    </Switch> : null
}