import React from 'react';
import '../styles/App.css';
import CalcButton from '../components/CalcButton';
import CalcDisplay from '../components/CalcDisplay';
import { RunOperators } from '../utils/calcs';

class TinyCalculator extends React.Component {
    state = {
        value: null,
        displayValue: '0',
        operator: null,
        waitingForOperand: false
    };

    clearAll() {
        this.setState({
            value: null,
            displayValue: '0',
            operator: null,
            waitingForOperand: false
        })
    }

    clearLastChar() {
        const { displayValue } = this.state

        this.setState({
            displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
        })
    }

    toggleSign() {
        const { displayValue } = this.state
        const newValue = parseFloat(displayValue) * -1

        this.setState({
            displayValue: String(newValue)
        })
    }

    inputDigit(digit) {
        const { displayValue, waitingForOperand } = this.state

        if (waitingForOperand) {
            this.setState({
                displayValue: String(digit),
                waitingForOperand: false
            })
        } else {
            this.setState({
                displayValue: displayValue === '0' ? String(digit) : displayValue + digit
            })
        }
    }

    calc(nxtOper) {
        const { value, displayValue, operator } = this.state
        const inputValue = parseFloat(displayValue)

        if (value == null) {
            this.setState({
                value: inputValue
            })
        } else if (operator) {
            console.log('Current value is: ', value)
            console.log('Input value is: ', inputValue)
            const currentValue = value || 0
            const newValue = RunOperators[operator](currentValue, inputValue)
            console.log('Result is:', newValue)
            if (isNaN(newValue) === false) {
                this.setState({
                    value: newValue,
                    displayValue: String(newValue)
                })
            }
        }

        this.setState({
            waitingForOperand: true,
            operator: nxtOper
        })
    }

    listenKeyDownFromKeyboard = (event) => {
        let { key } = event
        console.log('--------------Listen from keyboard ----------')
        console.log('Your key is inputed from keyboard: ', key)
        if (key === 'Enter') {
            key = '='
        }

        if ((/\d/).test(key)) { // Check key was input is number or not
            event.preventDefault()
            this.inputDigit(parseInt(key, 10))
        } else if (key in RunOperators) {
            event.preventDefault()
            this.calc(key)
        }
        else if (key === 'Backspace') {
            event.preventDefault()
            this.clearLastChar()
        } else if (key === 'Clear') {
            event.preventDefault()

            this.clearAll()
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.listenKeyDownFromKeyboard)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.listenKeyDownFromKeyboard)
    }

    render() {
        const { displayValue } = this.state

        return (
            <div className="App">
                <div className="calculator">
                    <CalcDisplay displayValue={displayValue}></CalcDisplay>

                    <div className="calculator-keypad">
                        <div className="input-keys">
                            <div className="function-keys">
                                <CalcButton className="key-clear" onClick={() => this.clearAll()}>{'clear'}</CalcButton>
                            </div>

                            <div className="digit-keys">
                                <CalcButton className="key-1" onClick={() => this.inputDigit(1)}>1</CalcButton>
                                <CalcButton className="key-2" onClick={() => this.inputDigit(2)}>2</CalcButton>
                                <CalcButton className="key-3" onClick={() => this.inputDigit(3)}>3</CalcButton>
                                <CalcButton className="key-4" onClick={() => this.inputDigit(4)}>4</CalcButton>
                                <CalcButton className="key-5" onClick={() => this.inputDigit(5)}>5</CalcButton>
                                <CalcButton className="key-6" onClick={() => this.inputDigit(6)}>6</CalcButton>
                                <CalcButton className="key-7" onClick={() => this.inputDigit(7)}>7</CalcButton>
                                <CalcButton className="key-8" onClick={() => this.inputDigit(8)}>8</CalcButton>
                                <CalcButton className="key-9" onClick={() => this.inputDigit(9)}>9</CalcButton>
                            </div>
                        </div>
                        <div className="operator-keys">
                            <CalcButton className="key-divide" onClick={() => this.calc('/')}>÷</CalcButton>
                            <CalcButton className="key-subtract" onClick={() => this.calc('-')}>−</CalcButton>
                            <CalcButton className="key-add" onClick={() => this.calc('+')}>+</CalcButton>
                            <CalcButton className="key-equals" onClick={() => this.calc('=')}>=</CalcButton>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default TinyCalculator;