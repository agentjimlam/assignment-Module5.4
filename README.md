App.js contains a Rock Paper Scissors game.

Tried the expo calender tutorial: https://docs.expo.dev/versions/latest/sdk/calendar/

Tried the expo pedometer tutorial: https://docs.expo.dev/versions/latest/sdk/pedometer/
- Encountered phone permissions issue, can't find a way to request to allow access to "physical activity".
- Used Samsung and Xiaomi phones, both not successful

### Extra for Rock Paper Scissor

If want to customize the win and text colors

```javascript
<Text
  Text
  style={[
    styles.result,
    result === "player" && styles.winResult,
    result === "computer" && styles.loseResult,
  ]}
>
  {result === "tie"
    ? "It's a tie!"
    : result === "player"
    ? "You win!"
    : "Computer wins!"}
</Text>
```

Add to the CSS

```javascript
winResult: {
 color: '#32cd32', // Strong lime green
 },
 loseResult: {
 color: '#ff3b30', // Vivid red
 },
```