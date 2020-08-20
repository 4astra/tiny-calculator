import React from 'react';
import '../styles/App.css'

class CalcDisplay extends React.Component {
    render() {
        const { displayValue, className } = this.props

        return (
            <div className="calculator-display-row">
                <div className={`calculator-display ${className}`}>{displayValue}</div>
            </div>
        )
    }
}

export default CalcDisplay;