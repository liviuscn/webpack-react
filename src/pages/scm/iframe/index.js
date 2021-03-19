import React from 'react'
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd'
const { Header, Content } = Layout;
import './index.less'

export default (props) => {
    const portalState = useSelector((state) => state.portal);
    const { panes } = portalState;
    const { path, url } = useRouteMatch()

    const getSrc = () => {
        let item = panes.find(pane => pane.key === url)
        return item ? item.src : null;
    }
    return <Layout class='iframe-container'>
        <Content>
            <iframe
                class="iframe"
                src={getSrc()}
                allowfullscreen="true"
                webkitallowfullscreen="true"
                mozallowfullscreen="true"
            >
                请升级浏览器
            </iframe>
        </Content>
    </Layout>
}