import React, { Component } from 'react';
import "./Cup.scss"

class Cup extends Component {
    handleClick = () => {
        if (this.props.onToggle){
            this.props.onToggle(this.props.cup.row, this.props.cup.column)
        }
    }

    render() {        
        return (
            <div className={"cup" + (this.props.cup.active ? " active-cup" : "")}
                 onClick={() => this.handleClick()}>
            </div>
        )
    }
}

export default Cup;