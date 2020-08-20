import React from 'react';

class CalcButton extends React.Component {
    render() {
        const { onClick, className, ...props } = this.props

        return (
            <div onClick={onClick}>
                <button className={`calculator-key ${className}`} {...props} />
            </div>
        )
    }
}

export default CalcButton;