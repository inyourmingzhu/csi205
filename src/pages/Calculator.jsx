import React, { useState, useEffect } from 'react';
import '../calculator.css';

const Calculator = () => {
  const [screen, setScreen] = useState('0');
  const [state, setState] = useState('S0');
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [lastOperator, setLastOperator] = useState('?');

  // อัปเดตหน้าจอ
  const updateScreen = (value) => {
    setScreen(value);
  };

  // เมื่อกดตัวเลข
  const numberClicked = (number) => {
    let newScreen = screen;

    if (state === 'S0') {
      newScreen = number.toString();
      setState('S1');
    } else if (state === 'S1') {
      if (screen.length < 9) {
        newScreen += number.toString();
      }
    } else if (state === 'S2') {
      if (screen === first.toString()) {
        newScreen = number.toString();
      } else {
        newScreen += number.toString();
      }
      setSecond(Number(newScreen));
    }

    updateScreen(newScreen);
  };

  // เมื่อกดเครื่องหมาย + หรือ -
  const operatorClicked = (operator) => {
    if (state === 'S1') {
      setFirst(Number(screen));
      setLastOperator(operator);
      setState('S2');
    } else if (state === 'S2') {
      setLastOperator(operator);
    }
  };

  // เมื่อกด =
  const equalClicked = () => {
    let result = first;
    let currentSecond = second;

    if (state === 'S2') {
      currentSecond = screen === first.toString() ? first : Number(screen);
      setSecond(currentSecond);

      if (lastOperator === '+') result = first + currentSecond;
      else if (lastOperator === '-') result = first - currentSecond;

      setScreen(result.toString());
      setFirst(result);
      setState('S1');
    } else if (state === 'S1') {
      if (lastOperator === '+') result = first + second;
      else if (lastOperator === '-') result = first - second;

      setScreen(result.toString());
      setFirst(result);
    }
  };

  // เคลียร์หน้าจอ
  const ceClicked = () => {
    setScreen('0');
    setState('S0');
    setFirst(0);
    setSecond(0);
    setLastOperator('?');
  };

  // รองรับการกดคีย์บอร์ด
  useEffect(() => {
    const checkKeyboard = (event) => {
      if (event.key >= '0' && event.key <= '9') {
        numberClicked(Number(event.key));
      } else if (event.key === '+' || event.key === '-') {
        operatorClicked(event.key);
      } else if (event.key === 'Enter') {
        equalClicked();
      } else if (event.key === 'Escape') {
        ceClicked();
      }
    };

    document.addEventListener('keydown', checkKeyboard);
    return () => document.removeEventListener('keydown', checkKeyboard);
  }, [screen, state, first, second, lastOperator]);

  // สร้างปุ่มแบบ reusable
  const renderButton = (label, onClick, className = 'cal-btn cal-btn-blue', disabled = false, id = null) => (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      id={id}
    >
      {label}
    </button>
  );

  // ปรับสีปุ่ม operator
  const plusClass = lastOperator === '+' ? 'cal-btn cal-btn-orange' : 'cal-btn cal-btn-pink';
  const minusClass = lastOperator === '-' ? 'cal-btn cal-btn-orange' : 'cal-btn cal-btn-pink';

  return (
    <div className="cal-container">
      <div className="cal-screen" role="status" aria-live="polite">{screen}</div>

      <div className="cal-row">
        {renderButton('MC', null, 'cal-btn cal-btn-pink', true)}
        {renderButton('MR', null, 'cal-btn cal-btn-pink', true)}
        {renderButton('M+', null, 'cal-btn cal-btn-pink', true)}
        {renderButton('M−', null, 'cal-btn cal-btn-pink', true)}
        {renderButton('CE', ceClicked, 'cal-btn cal-btn-pp')}
      </div>

      <div className="cal-grid">
        {[7, 8, 9].map((n) => renderButton(n, () => numberClicked(n)))}
        {renderButton('÷', null, 'cal-btn cal-btn-pink', true)}
        {renderButton('√', null, 'cal-btn cal-btn-pink', true)}

        {[4, 5, 6].map((n) => renderButton(n, () => numberClicked(n)))}
        {renderButton('×', null, 'cal-btn cal-btn-pink', true)}
        {renderButton('%', null, 'cal-btn cal-btn-pink', true)}

        {[1, 2, 3].map((n) => renderButton(n, () => numberClicked(n)))}
        {renderButton('−', () => operatorClicked('-'), minusClass, false, 'minus')}
        {renderButton('1/x', null, 'cal-btn cal-btn-pink', true)}

        {renderButton(0, () => numberClicked(0), 'cal-btn cal-btn-blue cal-zero', false, 'zero')}
        {renderButton('.', null, 'cal-btn cal-btn-blue', true)}
        {renderButton('+/−', null, 'cal-btn cal-btn-blue', true)}
        {renderButton('+', () => operatorClicked('+'), plusClass, false, 'plus')}
        {renderButton('=', equalClicked, 'cal-btn cal-btn-pink')}
      </div>

      <div className="student">67176203 pattarapond saelee</div>
    </div>
  );
};

export default Calculator;
