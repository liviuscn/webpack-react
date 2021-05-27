import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { GithubPicker, ColorResult } from 'react-color'
import './index.less'

export default () => {
    const [color, setColor] = useState("black")
    const [active, setActive] = useState("pen");
    const [history, setHistory] = useState([])
    const drawRef = useRef(false);
    const locationRef = useRef([]);
    const canvasRef = useRef(null);


    useEffect(() => {
        const toggleDraw = () => {
            drawRef.current = false
        }
        window.addEventListener('click', toggleDraw)
        return () => {
            window.removeEventListener('click', toggleDraw)
        }
    })
    function recallClick() {
        const canvas = canvasRef.current
        let ctx = canvas.getContext('2d')
        let step = history.length - 1
        if (step >= 0) {
            step--;
            ctx.clearRect(0, 0, 1000, 1000);
            let canvasPic = new Image();
            canvasPic.src = history[step];
            canvasPic.addEventListener('load', () => {
                ctx.drawImage(canvasPic, 0, 0);
            });
            history.pop()
            setHistory(history);
        } else {
            console.log('不能再继续撤销了');
        }
    }
    function downloadImg() {
        const canvas = canvasRef.current
        let url = canvas.toDataURL('image/png');
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = '我的绘画';
        a.target = '_blank';
        a.click();
    }
    function handleMouseDown(e) {
        e.persist()
        locationRef.current = []
        drawRef.current = true;
        const canvas = canvasRef.current;
        let ctx = canvas.getContext('2d')
        ctx.beginPath();
        switch (active) {
            case 'spray':
                return canvas.style.backgroundColor = color
            default:
                return
        }
    }
    function handleMouseMove(e) {
        e.persist()

        if (drawRef.current) {
            const canvas = canvasRef.current;
            let ctx = canvas.getContext('2d')
            let locationArr = locationRef.current;
            locationArr.push([e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop])

            switch (active) {
                case 'pen':
                    ctx.strokeStyle = color
                    ctx.lineJoin = "round";
                    ctx.lineWidth = 5;
                    ctx.beginPath();
                    locationArr.length > 1 && ctx.moveTo(locationArr[locationArr.length - 2][0], locationArr[locationArr.length - 2][1]);
                    ctx.lineTo(locationArr[locationArr.length - 1][0], locationArr[locationArr.length - 1][1]);
                    ctx.closePath();
                    ctx.stroke();  //描边
                    break;
                case 'eraser':
                    ctx.strokeStyle = canvas.style.backgroundColor || '#ccc'
                    ctx.lineJoin = "round";
                    ctx.lineWidth = 5;
                    ctx.beginPath();
                    locationArr.length > 1 && ctx.moveTo(locationArr[locationArr.length - 2][0], locationArr[locationArr.length - 2][1]);
                    ctx.lineTo(locationArr[locationArr.length - 1][0], locationArr[locationArr.length - 1][1]);
                    ctx.closePath();
                    ctx.stroke();  //描边
                    break;
                case 'rectangle':
                    let [left, top] = locationArr[0]

                    let prewidth = locationArr.length > 1 && locationArr[locationArr.length - 2][0] - left
                    let preheight = locationArr.length > 1 && locationArr[locationArr.length - 2][1] - top
                    let width = locationArr[locationArr.length - 1][0] - left
                    let height = locationArr[locationArr.length - 1][1] - top

                    ctx.beginPath();
                    ctx.rect(left, top, width, height);
                    ctx.closePath();
                    ctx.lineWidth = '6';
                    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
                    ctx.strokeStyle = "red";
                    ctx.fill();
                    ctx.stroke();

                    // ctx.beginPath();
                    // ctx.lineWidth = '6';
                    // ctx.fillStyle = 'rgba(0, 0, 0, 0)';
                    // ctx.strokeStyle = 'red';
                    // ctx.clearRect(left, top, prewidth, preheight)
                    // ctx.fillRect(left, top, width, height);
                    // ctx.strokeRect(left, top, width, height);

                    break;
                default:
                    break;
            }

        }
    }
    function handleMouseUp(e) {
        e.persist()
        locationRef.current = []
        drawRef.current = []
        const canvas = canvasRef.current;
        history.push(canvas.toDataURL())
        setHistory(history)
    }
    return (
        <div className="Annotation">

            <div>
                <GithubPicker width="500px" color={color} onChange={(value) => setColor({ color: value.hex })} />
            </div>

            <div className="Annotation-paint-right">
                <ul>
                    <li onClick={() => { setActive('pen') }} className={classNames({ 'active': active === 'pen' })}><i className="iconfont icon-bianjixiugaiqianbishuxie">画笔</i></li>
                    <li onClick={() => { setActive('eraser') }} className={classNames({ 'active': active === 'eraser' })}><i className="iconfont icon-xiangpica">橡皮擦</i></li>
                    <li onClick={() => { setActive('spray') }} className={classNames({ 'active': active === 'spray' })}><i className="iconfont icon-youqitong">喷雾</i></li>
                    <li onClick={() => { setActive('rectangle') }} className={classNames({ 'active': active === 'rectangle' })}><i className="iconfont icon-juxing">矩形</i></li>
                    <li onClick={recallClick} className={classNames({ 'active': active === 'recall' })}><i className="iconfont icon-chexiao">撤销</i></li>
                    <li onClick={downloadImg} className={classNames({ 'active': active === 'download' })}><i className="iconfont icon-baocun1">下载</i></li>
                </ul>
            </div>

            <div className="Annotation-canvas">
                <canvas
                    id="canvas"
                    ref={canvasRef}
                    width={window.innerWidth - 260}
                    height={window.innerHeight - 300}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                ></canvas>
            </div>


        </div>
    )
}