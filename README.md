# Poker Hands

## 🚀 My Process

### The Project

- Went with React Native with typescript for the assignment.
- Deck api was easy to consume, with most of my time being used to ensure the hand reading logic as sound.

### Layout / Logic

- Screen One, Home, handles deck and draw logic.
- Screen Two, History, displays past ten hands
- useDeck hook handles the logic of displaying the hand and determining best hand, as well as adding hands to handHistory
- For global state, I used Async storage, for just holding onto the hand history it made sense over a larger global state manager such as redux or context

### Best Hand Logic

- sorting the hand to detemermine the best hand was the easiest route. I used a few objects to count suits and values, then used those values for the logic

## 📝 Notes

History handIndex at undefined would throw an error using it as an index so I set it to -1
With more time, possibly adding toasts or more fun UI animations.
