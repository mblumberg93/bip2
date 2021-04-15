import React, { Component } from 'react';
import "./Square.scss"
import Cup from "../Cup/Cup"

class Square extends Component {
    handleToggle = () => {
        if (this.props.cup && this.props.onToggle){
            this.props.onToggle(this.props.cup.row, this.props.cup.column)
        }
    }

    render() {
        return (
            <div className={"square" + (this.props.cup ? "" : " empty-square")}>
                { this.props.cup &&
                    <Cup key={(this.props.opponent ? "opponent" : "") + "cup" + this.props.row + this.props.column}
                         cup={this.props.cup}
                         onToggle={() => this.handleToggle()}>
                    </Cup>
                }
            </div>
        )
    }
}

export default Square;