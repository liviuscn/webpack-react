import React, { Component } from 'react'
import { Button } from 'antd'


/**
    before
    挂载阶段生命周期
    Parent constructor
    Parent componentWillMount
    Parent render
    Child constructor
    Child componentWillMount
    Child render
    Child componentDidMount
    Parent componentDidMount
    更新阶段生命周期
    Parent setState
    Parent shouldComponentUpdate
    Parent componentWillUpdate
    Parent render
    Child componentWillReceiveProps
    Child shouldComponentUpdate
    Child componentWillUpdate
    Child render
    Child componentDidUpdate
    Parent componentDidUpdate
 */

class Soon extends Component {
    constructor(props) {
        super(props)
        console.log("Soon constructor")
    }
    componentWillMount() {
        console.log("Soon componentWillMount")
    }
    //render(){}
    componentDidMount() {
        console.log("Soon componentDidMount")
    }
    /***************************** */
    componentWillReceiveProps(nextProps) {
        console.log("Soon componentWillReceiveProps")
    }
    shouldComponentUpdate() {
        console.log("Soon shouldComponentUpdate")
        return true
    }
    componentWillUpdate() {
        console.log("Soon componentWillUpdate")
    }
    //render(){}
    componentDidUpdate() {
        console.log("Soon componentDidUpdate")
    }
    /***************************** */
    componentWillUnmount() {
        console.log("Soon componentWillUnMount")
    }

    render() {
        console.log("Soon render")
        return <div>{this.props.count}</div>
    }
}


class Child extends Component {

    constructor(props) {
        super(props)
        console.log("Child constructor")
        this.state = {
            count: props.count
        }
    }
    componentWillMount() {
        console.log("Child componentWillMount")
    }
    //render(){}
    componentDidMount() {
        console.log("Child componentDidMount")
    }
    /***************************** */
    componentWillReceiveProps(nextProps) {
        console.log("Child componentWillReceiveProps", nextProps)
        if (nextProps.count !== this.props.count) {
            this.setState({
                count:nextProps.count
            })
        }
    }
    shouldComponentUpdate() {
        console.log("Child shouldComponentUpdate")
        return true
    }
    componentWillUpdate() {
        console.log("Child componentWillUpdate")
    }
    //render(){}
    componentDidUpdate() {
        console.log("Child componentDidUpdate")
    }
    /***************************** */
    componentWillUnmount() {
        console.log("Child componentWillUnMount")
    }

    render() {
        console.log("Child render")
        return <div>
            {this.props.count}
            {/* <Soon count={this.props.count}></Soon> */}
        </div>
    }
}

export default class Parent extends Component {
    constructor(props) {
        super(props);
        console.log("Parent constructor")
        this.state = {
            count1: 1,
            count2: 1
        }
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
    }
    componentWillMount() {
        console.log("Parent componentWillMount")
    }
    componentDidMount() {
        console.log("Parent componentDidMount")
    }

    componentWillReceiveProps(nextProps) {
        console.log("Parent componentWillReceiveProps")
    }
    shouldComponentUpdate() {
        console.log("Parent shouldComponentUpdate")
        return true
    }
    componentWillUpdate() {
        console.log("Parent componentWillUpdate")
    }

    componentDidUpdate() {
        console.log("Parent componentDidUpdate")
    }

    componentWillUnmount() {
        console.log("Parent componentWillUnMount")
    }

    handleClick1() {
        this.setState({
            count1: this.state.count1 + 1
        })
    }
    handleClick2() {
        this.setState({
            count2: this.state.count2 + 1
        })
    }
    render() {
        console.log("Parent render")
        return <div>
            <Child count={this.state.count1}></Child>
            <div>{this.state.count1}</div>
            <div>{this.state.count2}</div>
            <Button onClick={this.handleClick1}>click1</Button>
            <Button onClick={this.handleClick2}>click2</Button>
        </div>
    }
}