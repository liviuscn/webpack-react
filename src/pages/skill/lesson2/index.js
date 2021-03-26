import React, { Component } from 'react'
import { Button } from 'antd'

/**
挂载阶段生命周期
Parent constructor
Parent static getDerivedStateFromProps 派生state
Parent render
Child constructor
Child static getDerivedStateFromProps
Child render
Child componentDidMount
Parent componentDidMount 
更新阶段生命周期
Parent setState
Parent static getDerivedStateFromProps
Parent shouldComponentUpdate
Parent render
Child static getDerivedStateFromProps
Child shouldComponentUpdate
Child render
Child getSnapshotBeforeUpdate
Parent getSnapshotBeforeUpdate
Child componentDidUpdate
Parent componentDidUpdate
*/
class Child extends Component {

    constructor(props) {
        super(props)
        console.log("Child constructor")
    }
    static getDerivedStateFromProps(props, state) {
        console.log("Child static getDerivedStateFromProps")
        return null;
    }
    componentDidMount() {
        console.log("Child componentDidMount")
    }
    shouldComponentUpdate() {
        console.log("Child shouldComponentUpdate")
        return true
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("Child getSnapshotBeforeUpdate")
    }
    componentDidUpdate() {
        console.log("Child componentDidUpdate")
    }
    render() {
        console.log("Child render")
        return <div>{this.props.count}</div>
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
    static getDerivedStateFromProps(props, state) {
        console.log("Parent static getDerivedStateFromProps")
        return null;
    }
    componentDidMount() {
        console.log("Parent componentDidMount")
    }
    shouldComponentUpdate() {
        console.log("Parent shouldComponentUpdate")
        return true
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("Parent getSnapshotBeforeUpdate")
    }
    componentDidUpdate() {
        console.log("Parent componentDidUpdate")
    }
    render() {
        console.log("Parent render")
        return <div>{this.props.count}</div>
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
            <Child key={1} count={this.state.count1}></Child>
            <Child key={2} count={this.state.count2}></Child>
            <div>{this.state.count1}</div>
            <div>{this.state.count2}</div>
            <Button onClick={this.handleClick1}>click1</Button>
            <Button onClick={this.handleClick2}>click2</Button>
        </div>
    }
}