import React, { useEffect, useState } from "react";

const Snake = () => {
  const [ctx, setCtx] = useState();
  // const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(100);
  let score = 0;
  let snake = [{ x: 2, y: 2 }];
  let direction = { x: 0, y: 0 };
  let food = { x: 15, y: 10 };
  const gridSize = 20;
  let canvas;
  const tileCount = 20; // 400/8

  function saanpBnaDenge() {
    if (ctx) ctx.fillStyle = "blue";
    snake.forEach((saanp) => {
      ctx.fillRect(saanp.x * gridSize, saanp.y * gridSize, gridSize, gridSize);
    });
  }

  function khanaKhanaKhanaBnanaHai() {
    ctx.fillStyle = "brown";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  }

  function saanpChlao() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };
      // setScore(score + 1);
      score = score + 1;
      document.getElementById("score").innerHTML = score;
    } else {
      snake.pop();
    }
  }

  function bhidaToNahi() {
    const head = snake[0];

    // Check if the snake hits the walls
    if (
      head.x < 0 ||
      head.x >= tileCount ||
      head.y < 0 ||
      head.y >= tileCount
    ) {
      return true;
    }

    // Check if the snake collides with its own body
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }

    return false;
  }
  function gameChlao() {
    setGameStarted(true);
    if (bhidaToNahi()) {
      alert(`Khela khatam! Your score is ${score}`);
      snake = [{ x: 10, y: 10 }];
      direction = { x: 0, y: 0 };
      food = { x: 15, y: 10 };
      // setScore(0);
      score = 0;
      document.getElementById("score").innerHTML = 0;
      // setGameStarted(false);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saanpChlao();
    saanpBnaDenge();
    khanaKhanaKhanaBnanaHai();
    setTimeout(gameChlao, level);
  }

  useEffect(() => {
    if (!canvas) {
      canvas = document.getElementById("gameCanvas");
      setCtx(canvas?.getContext("2d"));
      document.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();
        if ((key === "arrowup" || key === "w") && direction.y !== 1) {
          direction = { x: 0, y: -1 };
        } else if ((key === "arrowdown" || key === "s") && direction.y !== -1) {
          direction = { x: 0, y: 1 };
        } else if ((key === "arrowleft" || key === "a") && direction.x !== 1) {
          direction = { x: -1, y: 0 };
        } else if (
          (key === "arrowright" || key === "d") &&
          direction.x !== -1
        ) {
          direction = { x: 1, y: 0 };
        }
      });
    }
  }, [document.getElementById("gameCanvas"), level]);

  return (
    <>
      <canvas id="gameCanvas" width="400" height="400" />
      <br />
      {!gameStarted ? (
        <>
          <input
            type="radio"
            name="level"
            value={800}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          />{" "}
          Level 1 <br />
          <input
            type="radio"
            name="level"
            value={500}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          />{" "}
          Level 2 <br />
          <input
            type="radio"
            name="level"
            value={300}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          />{" "}
          Level 3 <br />
          <input
            type="radio"
            name="level"
            value={100}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          />{" "}
          Level 4 <br />
          <input
            type="radio"
            name="level"
            value={50}
            onChange={(e) => {
              setLevel(e.target.value);
            }}
          />{" "}
          Level 5 <br />
          <br />
          <button onClick={() => gameChlao()}>start</button>
        </>
      ) : (
        <p>
          Score: <span id="score" />
        </p>
      )}
      <br />
    </>
  );
};

export default Snake;
