import React, {Component} from "react"

// 实现表单的数据双向绑定，类似于Vue 的 v-model
export default class Personal extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: "wzy"
        }
    }
    handleChange(e){
        this.setState({
            value : e.target.value
        })
    }
    
    render(){
        return(
            <div>
                <input value={this.state.value} onChange={this.handleChange.bind(this)} />
                <p>{this.state.value}</p>
            </div>
        )
    }
    
}