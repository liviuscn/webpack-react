import React from 'react';

const Portal = React.lazy(() => import(/* webpackChunkName: "por.portal" */`@/pages/por/portal`))

export default [
    { exact: true, path: '/portal', component: Portal }
]