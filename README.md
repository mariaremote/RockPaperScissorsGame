# Rock Paper Scissors Game 

This simple Rock-Paper-Scissor Browser Game I built using this [Youtube Tutorial](https://youtu.be/1yS-JV4fWqY). 

![Screenshot of Game](screenshot.png)

## Description

The user has a selection of hand emojis at the top to choose from. 

Once clicked, the computer's choice will be revealed and the game history will be displayed below highlighting the winning hand. 

Simultaneously there is a score for each player that keeps track of their victories. 

## My Spin on this

- An additional `Spock` hand that shows up randomly (25% chance) and can beat all other hands. The computer will play this hand also at the same probability. 

- A "fade-out" in the game history to only ever shows the last `5` games played

## Issues

When trying to build the "fade-out" of the game history, my approach was to simply remove the last child items through their index.
However, since the game history is added in pairs, I need to remove two children at the same time also.

Currently I am exploring the following solutions: 

- set an additional class attribute for the "last-children" and then remove these collectively with `querySelectorAll('.last-children')`

- using the CSS grid container itself to limit the display of rows (overflow will simply be hidden)

## Solution

This is one of the classic OMG moments, where the solution just hits you like a hammer.
I was correct with removing the last child items through their index, but all I had to do is to keep the same index as the order of the children changed, in order to remove the correct pair of hands from the history. 

Hence by calling the `.removeChild` function twice, but with the same index I make sure the sequence of child-removal is guaranteed. 

```
function cleanUpBottom(){
    history.removeChild(history.children[12])
    history.removeChild(history.children[12])
}
```

This was a logical obstacle to overcome more than a programmatic. ✌😇


