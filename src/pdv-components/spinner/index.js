import React, { useState } from "react";
import Spin from 'pdv/spin'
import './index.less'

export default (props) => {
    return <div className="pdv-spinner">
        <div className="mask"></div>
        <div className="spin">
            <Spin></Spin>
            <div>加载中……</div>
        </div>
    </div>
}