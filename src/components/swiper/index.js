import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './swiper.less'

export default class Swiper extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            disX: 0,
            disY: 0,
            preDisX: 0,
            preDisY: 0,
            styleArr: []
        }
        this.dragStart = this.dragStart.bind(this);
        this.dragMove = this.dragMove.bind(this);
        this.dragEnd = this.dragEnd.bind(this);

    }

    static defaultProps = {
        loop: true,  //循环
        autoplay: true,//
        direction: 'left',//方向
        pagination: {  //分页器
            el: '.swiper-pagination'
        }
    }

    componentDidMount() {
        React.Children.map(this.props.children, function (params) {
            console.log(params)
        })

        this.clientWidth = this.ref.offsetWidth;//容器宽度
        this.clientHeight = this.ref.offsetHeight;//容器高度

        this.number = React.Children.count(this.props.children) //图片个数
        let activeIndex = this.state.activeIndex;//当前位置
        this.styleArr = []
        for (let i = 0; i < this.number; i++) {
            this.styleArr.push({
                position: 'absolute',
                top: 0,
                display: 'inline-block',
                listStyleType: 'none',
                verticalAlign: 'top',
                height: 'auto',
                boxSizing: 'border-box',
                margin: 'auto 0px',
                left: this.clientWidth * (activeIndex + i),
                width: this.clientWidth,
            })
        }
        this.setState({
            styleArr: this.styleArr
        })
        this.ulRef.addEventListener('touchstart', this.dragStart)
        this.ulRef.addEventListener('touchmove', this.dragMove)
        this.ulRef.addEventListener('touchend', this.dragEnd)
        this.loop()
    }

    componentWillUnmount() {
        this.ulRef.removeEventListener('touchstart', this.dragStart)
        this.ulRef.removeEventListener('touchmove', this.dragMove)
        this.ulRef.removeEventListener('touchend', this.dragEnd)
    }

    dragStart = (ev) => {
        clearInterval(this.timer);//暂停循环
        let activeIndex = this.state.activeIndex;//当前位置
        let styleArr = this.state.styleArr.map(o => Object.assign({}, o))

        //let styleArr=this.state.styleArr.slice()浅复制后数组元素为应用类型，相当于直接修改了state报错
        //例如
        //this.state中arr = [{ left: 1 }]
        //let arr = this.state.arr.slice();
        //arr[0].left = 22;//不会报错
        //但当render中有使用this.state.arr[0]时就会报错

        //
        if (activeIndex === 0) {
            styleArr[this.number - 1].left = -this.clientWidth
            this.setState({
                styleArr
            })
        }
        if (activeIndex === this.number - 1) {
            styleArr[0].left = this.clientWidth * this.number
            this.setState({
                styleArr
            })
        }
        if (ev.changedTouches) {
            this.startX = ev.changedTouches[0].pageX;
            this.startY = ev.changedTouches[0].pageY;
        } else {
            this.startX = ev.clientX;
            this.startY = ev.clientY;
        }
        //鼠标边界性
        this.startX > this.clientWidth ? this.startX = this.clientWidth : null
        this.startY > this.clientHeight ? this.startY = this.clientHeight : null

        //上次滑动的距离
        this.preDisX = this.state.disX;
        this.preDisY = this.state.disY;

    }

    dragMove(ev) {
        if (ev.changedTouches) {
            this.clientX = ev.changedTouches[0].pageX;
            this.clientY = ev.changedTouches[0].pageY;
        } else {
            this.clientX = ev.clientX;
            this.clientY = ev.clientY;
        }
        //鼠标边界性
        this.clientX > this.clientWidth ? this.clientX = this.clientWidth : null
        this.clientY > this.clientHeight ? this.clientY = this.clientHeight : null

        //鼠标滑动的距离 
        this.disX = this.clientX - this.startX;
        this.disY = this.clientY - this.startY;

        this.setState({
            disX: this.preDisX + this.disX,
            disY: this.preDisY + this.disY
        })

    }

    dragEnd(e) {
        let activeIndex = this.state.activeIndex;//当前位置
        if (this.disX > 0 && (this.disX > this.clientWidth / 2)) {
            activeIndex--
        } else if (this.disX < 0 && ((-1 * this.disX) > this.clientWidth / 2)) {
            activeIndex++
        }
        if (activeIndex < 0) {
            activeIndex = 2
        }
        if (activeIndex > 2) {
            activeIndex = 0
        }

        this.setState({
            activeIndex,
            disX: -this.clientWidth * activeIndex,
            disY: this.clientHeight * activeIndex,
            styleArr: this.styleArr
        })
        this.loop();//重新循环
    }

    //循环
    loop() {
        this.timer = setInterval(() => {
            let activeIndex = this.state.activeIndex;
            activeIndex++
            if (activeIndex < 0) {
                activeIndex = 2
            }
            if (activeIndex > 2) {
                activeIndex = 0
            }

            this.setState({
                activeIndex,
                disX: -this.clientWidth * activeIndex,
                disY: this.clientHeight * activeIndex,
                styleArr: this.styleArr
            })
        }, 3000);
    }

    render() {
        return (<div className={styles.slider} ref={(ref) => this.ref = ref}>
            <div className={styles.frame}>
                <ul ref={ref => this.ulRef = ref} style={{
                    transform: `translate3d(${this.state.disX}px, 0px, 0px)`,
                    width: 960,
                    height: 300
                }}>
                    {
                        React.Children.map(this.props.children, (child, index) => {
                            return <li style={this.state.styleArr[index] || {}}>{child}</li>;
                        })
                    }
                </ul>
            </div>
            <div className={styles.decorator}>
                <div className={styles.carousel}>
                    {
                        React.Children.map(this.props.children, (child, index) => {
                            return <div className={classNames(styles.dot, {
                                [styles.active]: this.state.activeIndex === index
                            })}><span></span></div>
                        })
                    }
                </div>
            </div>
        </div>)
    }

}