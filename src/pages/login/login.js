import React from 'react';
import { Map } from 'immutable'
import ReactDOM from 'react-dom';

class Text {
    constructor() {
        this.state = { message: 'Hello!11111111111111111' };
    }
    start() {
        this.SayHello()
    }
    SayHello() {
        alert(this.state.message)
    }
}

class SayHello extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: 'Hello!' };
        // 这一行很重要！
        // this.handleClick = this.handleClick.bind(this);
        //this.handleSayHello2()

    }

    handleClick() {
        this.handleSayHello()
    }

    handleSayHello() {
        this.handleSayHello2()
    }

    handleSayHello2() {
        alert(this.state.message)
    }

    render() {

        // 由于 `this.handleClick` 已经绑定至实例，因此我们才可以用它来处理点击事件
        return (
            <button onClick={
                function (params) {
                    this.handleClick()
            }.bind(this)
            }>
                Say hello
            </button>
        );
    }
}
ReactDOM.render(
    //绑定redux、热加载
    <SayHello />,
    document.getElementById('root'),
)
