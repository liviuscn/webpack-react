import React from 'react';

import './user.less'

type propsType = typeof defaultProps & {
    count: number
}

const defaultProps = {
    name: 'world'
}

const User: React.FC = (props: propsType) => {
    const [color, setColor] = React.useState('blue')
    const [fontSize, setFontsize] = React.useState('16px')

    const changeColor = () => {
        setColor('green')
    }

    const text = React.useRef<HTMLDivElement>(null)

    const changeBgC = () => {
        (text.current as HTMLDivElement).style.backgroundColor = '#e9e9e9'
    }

    React.useEffect(() => {
        let timer = setInterval(() => {
            setFontsize('100px')
        }, 10000)

        return () => {
            clearInterval(timer)
        }
    })

    return (
        <div>
            <div style={{ color }}>函数式组件</div>
            <button type="primary" className="example-button" onClick={changeColor}>
                点击换色{' '}
            </button>
            <button type='primary' className='example-button' onClick={changeBgC}>点击换背景色</button>
        </div>
    )
}

export default User