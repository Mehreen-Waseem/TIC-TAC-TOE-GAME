let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-btn");

let turnO = true; // Tracks current player (true = O, false = X)

const winPatterns = [ // Array of winning patterns
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.disabled || isGameOver) return; // Prevent clicks on disabled boxes or after game over

    console.log("Box was clicked");
    if (turnO) {
      box.innerText = "O";
    } else {
      box.innerText = "X";
    }
    box.disabled = true;
    turnO = !turnO; // Toggle turn
    checkWinner();
  });
});

resetButton.addEventListener("click", resetGame); // Add click listener to reset button

function checkWinner() {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("Winner:", pos1Val);
        showWinMessage(pos1Val); // Pass winner symbol to showWinMessage
        isGameOver = true; // Set game over flag
        return; // Exit checkWinner after finding a winner
      }
    }
  }
}

function showWinMessage(winner) {
  // Create a new element to hold the message
  const messageElement = document.createElement('div');
  messageElement.textContent = `Congratulations! ${winner} won the game!`;

  // Set the CSS styles for the message element (optional)
  messageElement.style.backgroundColor = 'green';
  messageElement.style.color = 'white';
  messageElement.style.padding = '10px';
  messageElement.style.textAlign = 'center';
  messageElement.style.position = 'fixed';
  messageElement.style.top = '50%';
  messageElement.style.left = '50%';
  messageElement.style.transform = 'translate(-50%, -50%)';

  // Append the message element to the document body
  document.body.appendChild(messageElement);

  // Automatically remove the message after 3 seconds
  setTimeout(() => {
    messageElement.remove();
  }, 3000);
}

function resetGame() {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  turnO = true;
  isGameOver = false; // Reset game over flag
}

// Add an optional flag to track game over state (initially false)
let isGameOver = false;

  