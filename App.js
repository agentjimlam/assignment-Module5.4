import { useState, useCallback } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const choices = ["rock", "paper", "scissors"];
const emojis = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
}; // check out https://emojipedia.org/raised-hand#designs for ✋ (closed fingers raised hand)

const getWinner = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) return "tie";
  if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {
    return "player";
  }
  return "computer";
};

export default function App() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const play = useCallback((choice) => {
    const computer = choices[Math.floor(Math.random() * 3)];
    setPlayerChoice(choice);
    setComputerChoice(computer);

    const gameResult = getWinner(choice, computer);
    setResult(gameResult);

    if (gameResult === "player") {
      setScore((prev) => ({ ...prev, player: prev.player + 1 }));
    } else if (gameResult === "computer") {
      setScore((prev) => ({ ...prev, computer: prev.computer + 1 }));
    }
  }, []);

  const reset = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.title}>Rock Paper Scissors</Text>

      <View style={styles.scoreContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>You</Text>
          <Text style={styles.scoreValue}>{score.player}</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>Computer</Text>
          <Text style={styles.scoreValue}>{score.computer}</Text>
        </View>
      </View>

{/* if no playerChoice made is true, it will show the 3 choices using Array.map() method, else if false playerChoice has been made, it will show player's and computer's choice */}
      {!playerChoice ? (
        <View style={styles.choicesContainer}>
          {choices.map((choice) => (
            <TouchableOpacity
              key={choice}
              style={styles.choiceButton}
              onPress={() => play(choice)}
            >
              <Text style={styles.choiceEmoji}>{emojis[choice]}</Text>
              <Text style={styles.choiceText}>{choice}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.resultContainer}>
          <View style={styles.choices}>
            <View style={styles.playerChoice}>
              <Text style={styles.choiceEmoji}>{emojis[playerChoice]}</Text>
              <Text style={styles.choiceText}>You chose {playerChoice}</Text>
            </View>
            <Text style={styles.vs}>VS</Text>
            <View style={styles.computerChoice}>
              <Text style={styles.choiceEmoji}>{emojis[computerChoice]}</Text>
              <Text style={styles.choiceText}>
                Computer chose {computerChoice}
              </Text>
            </View>
          </View>

          <Text style={styles.result}>
            {result === "tie"
              ? "It's a tie!"
              : result === "player"
              ? "You win!"
              : "Computer wins!"}
          </Text>

          <TouchableOpacity style={styles.playAgainButton} onPress={reset}>
            <Text style={styles.playAgainText}>Play Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f7", // very dark blue (darker) background #c5ccde #1a1a2e
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1c1c1e", // #fff white color title -> "Rock Paper Scissors"
    marginBottom: 40,
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 40,
  },
  scoreBox: {
    alignItems: "center",
    flexDirection: "column", 
    backgroundColor: "#ffffff", // Very dark blue box #16213e
    padding: 20,
    borderRadius: 15,
    minWidth: 120,
    shadowColor: '#000', // https://reactnative.dev/docs/shadow-props
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  scoreLabel: {
    color: "#86868b", // #e94560 bright red, for labels "You" and "Computer"
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  scoreValue: {
    color: "#1c1c1e", // #fff white color
    fontSize: 24,
    fontWeight: "bold",
  },
  choicesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    flexWrap: "wrap", // https://reactnative.dev/docs/flexbox
  },
  choiceButton: {
    backgroundColor: "#16213e", // #16213e Very dark blue
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    margin: 10,
    minWidth: 100,
  },
  choiceEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  choiceText: {
    color: "#fff", // white color
    fontSize: 16,
    textTransform: "capitalize",
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: "center",
    width: "100%",
  },
  choices: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
  },
  playerChoice: {
    alignItems: "center",
  },
  computerChoice: {
    alignItems: "center",
  },
  vs: {
    color: "#1c1c1e", // #e94560 Bright red
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  result: {
    color: "#1c1c1e", // #fff white color
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  playAgainButton: {
    backgroundColor: "#e94560", // Bright red
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  playAgainText: {
    color: "#fff", // white color
    fontSize: 18,
    fontWeight: "bold",
  },
});

// NESTED TERNARY OPERATOR: {result === "tie" ? "It's a tie!" : result === "player" ? "You win!" : "Computer wins!"}
// it is same as below...
// if (result === "tie") {
//   return "It's a tie!";
// } else if (result === "player") {
//   return "You win!";
// } else {
//   return "Computer wins!";
// }
