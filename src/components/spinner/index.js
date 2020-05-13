import React, { useState } from "react";
import Spin from '@/components/spin'

import styles from './spinner.less'

export default (props) => {
    return <div className={styles.root}>
        <div className={styles.mask}></div>
        <div className={styles.spin}>
            <Spin></Spin>
            <div>加载中……</div>
        </div>
    </div>
}