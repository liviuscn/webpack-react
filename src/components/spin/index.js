import React, { useState, useEffect, Fragment } from "react";
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './spin.less'

export default(props)=>{
    return <div className={styles.root}>
        <div className={styles.spin}></div>
    </div>
}