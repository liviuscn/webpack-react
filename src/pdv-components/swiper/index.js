import React, { Component } from 'react'
import classNames from 'classnames'
import bweenFunctions from './tween-functions'
import './index.less'
export default class Swiper extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeIndex: 0,
            disX: 0,
            disY: 0,
            preDisX: 0,
            preDisY: 0,
            styleArr: [],
            direction: 'right'
        }
        this.dragStart = this.dragStart.bind(this);
        this.dragMove = this.dragMove.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.startAnimation = this.startAnimation.bind(this)
    }

    static defaultProps = {
        loop: true,  //是否循环
        autoplay: true,//是否自动
        direction: 'left',//方向
        pagination: {  //分页器
            el: '.swiper-pagination'
        }
    }

    componentDidMount() {
        this.clientWidth = this.ref.offsetWidth;//容器宽度
        this.clientHeight = this.ref.offsetHeight;//容器高度
        this.number = React.Children.count(this.props.children) //图片个数
        let activeIndex = this.state.activeIndex;//当前位置

        //初始化样式
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

        this.ulRef.addEventListener('touchstart', this.dragStart, false)
        this.ulRef.addEventListener('touchmove', this.dragMove, false)
        this.ulRef.addEventListener('touchend', this.dragEnd, false)
        // this.stopAnimation = this.startAnimation();//开始动画

    }

    componentWillUnmount() {
        this.ulRef.removeEventListener('touchstart', this.dragStart, false)
        this.ulRef.removeEventListener('touchmove', this.dragMove, false)
        this.ulRef.removeEventListener('touchend', this.dragEnd, false)
        this.stopAnimation && this.stopAnimation();//停止动画
        this.stopDragEndAnimation && this.stopDragEndAnimation();//停止动画
    }

    dragStart = (ev) => {

        if (this.state.end === false) {
            return
        }
        this.setState({
            end: false
        })
        this.stopDragEndAnimation && this.stopDragEndAnimation();//停止动画

        //设置图片位置
        let styleArr = this.getStyle(this.state.activeIndex)

        this.setState({
            styleArr
        })

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

        this.preDisX = this.state.disX
        this.preDisY = this.state.disY

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
        const disX = this.clientX - this.startX;
        const disY = this.clientY - this.startY;

        let activeIndex = this.state.activeIndex;//当前位置

        //计算1/2位置
        let a = (this.preDisX + disX) / this.clientWidth
        let b = Math.abs(a)
        let c = Math.round(b)
        //console.log(a, b, c, activeIndex)
        //滑动超过一半的距离
        if (a > 0) {
            c = -c
        }
        activeIndex = c
        if (activeIndex < 0) {
            activeIndex = this.number - 1
        }
        if (activeIndex > this.number - 1) {
            activeIndex = 0
        }

        this.setState({
            disX: this.preDisX + disX,
            disY: this.preDisY + disY,
            activeIndex
        })

    }

    dragEnd() {
        //使用state中的数据是不准确的
        const preDisX = this.state.disX//this.state.disX
        const preDisY = this.state.disY//this.state.disY

        let activeIndex = this.state.activeIndex;//当前index
        let direction = '', beginPos, endPos

        let a = preDisX / this.clientWidth
        let b = Math.abs(a)
        let c = Math.round(b)
        //console.log(a, b, c, activeIndex)
        if (a > 0) c = -c

        endPos = - this.clientWidth * c
        beginPos = preDisX;//开始位置
        //console.log(activeIndex, beginPos, endPos)
        //拖动完成后从当前位置恢复到指定位置
        this.stopDragEndAnimation = this.dragEndAnimation({
            activeIndex,
            direction,
            beginPos,
            endPos
        })
    }

    getStyle(activeIndex) {
        let styleArr2 = this.styleArr.map(o => Object.assign({}, o))
        let number = this.number;
        let width = this.clientWidth;
        if (activeIndex === 0) {
            styleArr2[number - 1].left = -width
            return styleArr2
        } else if (activeIndex === number - 1) {
            styleArr2[0].left = width * number
            return styleArr2
        } else {
            return this.styleArr
        }
    }

    //开始动画
    startAnimation() {
        let duration = 1000,
            frameTime = 17,
            activeIndex,
            direction,
            timer0,
            timer1,
            timer2,
            now,
            number = this.number,
            width = this.clientWidth,
            beginPos,
            endPos,
            autoplay = false;

        const loop = () => {
            const passedTime = performance.now() - now;
            let currX = bweenFunctions.easeOutCubic(passedTime, beginPos, endPos, duration)

            if (!currX) currX = 0
            if (Math.abs(currX - beginPos) > Math.abs(endPos - beginPos)) {
                if (autoplay) {
                    if (direction === 'left') {
                        activeIndex++
                    } else if (direction === 'right') {
                        activeIndex--
                    }
                    if (activeIndex > number - 1) {
                        activeIndex = 0
                    }
                    if (activeIndex < 0) {
                        activeIndex = number - 1
                    }

                    let styleArr = this.getStyle(activeIndex)

                    //停留3s后再执行
                    this.setState({
                        disX: -width * activeIndex,
                        styleArr,
                        activeIndex: activeIndex
                    })
                    //自动
                    timer2 = setTimeout(() => {
                        //暂停3s
                        beginPos = -width * activeIndex
                        endPos = direction === 'left' ? -width * (activeIndex + 1) : -width * (activeIndex - 1)
                        now = performance.now();
                        timer1 = window.requestAnimationFrame(loop);
                    }, 3000);
                }
                return window.cancelAnimationFrame(timer1)
            } else {
                this.setState({
                    disX: currX
                })
            }
            timer1 = window.requestAnimationFrame(loop);
        }

        if (autoplay) {
            timer0 = setTimeout(() => {
                activeIndex = this.state.activeIndex
                direction = this.state.direction
                let styleArr = this.getStyle(activeIndex)
                this.setState({
                    styleArr
                })
                beginPos = -width * activeIndex
                endPos = direction === 'left' ? -width * (activeIndex + 1) : -width * (activeIndex - 1)
                now = performance.now();
                timer1 = window.requestAnimationFrame(loop);
            }, 3000);
        }
        return () => {
            clearTimeout(timer0)
            window.cancelAnimationFrame(timer1)
            clearTimeout(timer2)
        }
    };

    //滑动后的动画
    dragEndAnimation(dragEnd) {
        let duration = 1000,
            frameTime = 17,
            activeIndex,
            direction,
            timer0,
            timer1,
            timer2,
            now,
            number = this.number,
            width = this.clientWidth,
            beginPos,
            endPos,
            autoplay = true;

        const loop = () => {
            const passedTime = performance.now() - now;
            let currX = bweenFunctions.easeOutCubic(passedTime, beginPos, endPos, duration)
            if (!currX) currX = 0
            if (Math.abs(currX - beginPos) > Math.abs(endPos - beginPos)) {
                this.setState({
                    disX: -width * activeIndex,
                    styleArr: this.styleArr,//图片位置重置
                    end: true
                })
                return window.cancelAnimationFrame(timer1)
            } else {
                this.setState({
                    disX: currX
                })
            }
            timer1 = window.requestAnimationFrame(loop);
        }

        activeIndex = dragEnd.activeIndex
        direction = dragEnd.direction
        beginPos = dragEnd.beginPos;
        endPos = dragEnd.endPos;
        now = performance.now();
        timer1 = window.requestAnimationFrame(loop);

        return () => {
            clearTimeout(timer0)
            window.cancelAnimationFrame(timer1)
            clearTimeout(timer2)
        }
    };

    render() {
        return (<div className="pdv-slider" ref={(ref) => this.ref = ref}>
            <div className="frame">
                <ul ref={ref => this.ulRef = ref} style={{
                    transform: `translate3d(${this.state.disX}px, 0px, 0px)`,
                    width: 960,
                    height: 300,
                    position: 'relative',
                    display: 'block',
                    margin: '0px',
                    padding: '0px',
                    cursor: 'inherit',
                    boxSizing: 'border-box'
                }}>
                    {
                        React.Children.map(this.props.children, (child, index) => {
                            return <li style={this.state.styleArr[index]}>{child}</li>;
                        })
                    }
                </ul>
            </div>
            <div className="decorator">
                <div className="carousel">
                    {
                        React.Children.map(this.props.children, (child, index) => {
                            return <div className={classNames('dot', {
                                "active": this.state.activeIndex === index
                            })}><span></span></div>
                        })
                    }
                </div>
            </div>
        </div>)
    }

}