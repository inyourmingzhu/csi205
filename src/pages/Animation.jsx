import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import '../indexball.css';

// Static image paths from public folder jaaa
const IMAGES = {
  basketball: './img/basketball.png',
  football: './img/football.png',
  volleyball: './img/volleyball.png',
  human: './img/human.png',
  cartoon: './img/cartoon.png',
  logo: './img/logo.png',
  field: './img/field.png',
};

const ballOptions = ['Basketball', 'Football', 'Volleyball', 'Human', 'Cartoon', 'Logo'];

const Animation = () => {
  const fieldWidth = 700;
  const fieldHeight = 400;
  const diameter = 100;
  const maxLeft = fieldWidth - diameter - 2;
  const maxTop = fieldHeight - diameter - 2;
  const vx = 5;
  const vy = 5;

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [running, setRunning] = useState(false);
  const [selectedBall, setSelectedBall] = useState(null); // null = plain color

  // Animation loop
  useEffect(() => {
    let id = null;
    if (running) {
      id = setInterval(() => {
        setX((prevX) => {
          const nextX = goRight ? prevX + vx : prevX - vx;
          if (nextX >= maxLeft) {
            setGoRight(false);
            return maxLeft;
          }
          if (nextX <= 0) {
            setGoRight(true);
            return 0;
          }
          return nextX;
        });

        setY((prevY) => {
          const nextY = goDown ? prevY + vy : prevY - vy;
          if (nextY >= maxTop) {
            setGoDown(false);
            return maxTop;
          }
          if (nextY <= 0) {
            setGoDown(true);
            return 0;
          }
          return nextY;
        });
      }, 25);
    }
    return () => clearInterval(id);
  }, [running, goRight, goDown]);

  // Toggle animation
  const toggleRun = () => setRunning((r) => !r);

  // Change ball image
  const changeBall = (name) => {
    const key = name.toLowerCase();
    setSelectedBall(IMAGES[key] || null);
  };

  // Check active button
  const isActive = (name) => {
    if (name === 'none') return selectedBall === null;
    return selectedBall === IMAGES[name.toLowerCase()];
  };

  return (

    <div className='p-4'>

              <div className="anim-container p-4">
            {/* Field */}
            <div
              className="anim-field"
              style={{
                width: fieldWidth,
                height: fieldHeight,
                backgroundImage: `url("${IMAGES.field}")`,
                backgroundSize: 'cover',
                position: 'relative',
              }}
            >
              {/* Ball */}
              <div
                className="anim-ball"
                role="img"
                aria-label={selectedBall ? 'ball' : 'plain ball'}
                style={{
                  width: diameter,
                  height: diameter,
                  left: x,
                  top: y,
                  position: 'absolute',
                  backgroundImage: selectedBall ? `url("${selectedBall}")` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: selectedBall ? 'transparent' : '#e6f3ff',
                  borderRadius: '50%',
                  transition: 'left 0.02s linear, top 0.02s linear',
                }}
              />
            </div>

            {/* Controls */}
            <div className="anim-control mt-3 d-flex flex-wrap gap-2 align-items-center">
              <Button variant={running ? 'warning' : 'success'} onClick={toggleRun}>
                {running ? 'PAUSE' : 'RUN'}
              </Button>
              <Button
                variant={isActive('none') ? 'secondary' : 'outline-secondary'}
                onClick={() => changeBall('none')}
              >
                None
              </Button>
              {ballOptions.map((b) => (
                <Button
                  key={b}
                  variant={isActive(b) ? 'primary' : 'outline-primary'}
                  onClick={() => changeBall(b)}
                >
                  {b}
                </Button>
              ))}
            </div>

            {/* Debug info */}
            <div style={{ fontSize: 12, marginTop: 8, color: '#555' }}>
              <div>selectedBall: {selectedBall || '(none)'}</div>
              <div>x: {x}px, y: {y}px</div>
            </div>
          </div>

    </div>
    
  );
};

export default Animation;

