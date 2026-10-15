# Retained source: Arrays of Sprites

Activity/source ID: MCA-CSINTRO2-ARRAYS-SPRITES

Original retained path: docs/pedagogy/corpus/sources/makecode-arcade-csintro/raw/production/1A-050/repository/docs/courses/csintro2/arrays/sprites.md

These are exact selected passages, with omissions explicitly separated. Source-local line numbers follow.

## Source lines 1-19

````text
# Activity: Arrays of Sprites

So far we have used arrays of numbers and strings. We will see that arrays can be used with any variable type, including sprites.

In this activity, we will use arrays of sprites to create unique behaviors for the characters in our games, as well as introduce the basics of artificial intelligence for our enemy characters.

In this activity, students will:
* Create arrays of sprites
* Interact with multiple sprites using arrays
* Use ``||sprites:array of sprites of kind||``
* Implement "following" behavior for enemies

## Concept: Creating Sprite Arrays

Creating arrays of sprites follow a similar process as creating arrays of numbers or strings. Start with a new array (e.g.- of numbers), and then replace all of the numbers within the array with sprites.

![creating an array of sprites](/static/courses/csintro2/arrays/create-sprite-array.gif)

A sprite array is useful when implementing the same behavior for several sprites at once.
````

## Source lines 23-38

````text
## Example #1: Moving all Asteroids

1. Review the code below
2. Create the sample code and run the code
3. Save the code for the task (name it "Sprite Arrays")

```blocks
namespace SpriteKind {
    export const Asteroid = SpriteKind.create();
}
let my_sprite_array: Sprite[] = []
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let value of my_sprite_array) {
        value.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
    }
})
````

## Source lines 93-105

````text
## Student Task #1: Moving a Random Asteroid

1. Start with the code from example #1
2. Instead of moving every asteroid, select a random asteroid from ``||variables:my sprite array||`` and move only that asteroid when the ``||controller:A||`` button is pressed
3. **Challenge:** choose another random asteroid, and have it ``||sprites:say||`` "woosh" for 300 ms. Are the two randomly chosen asteroids the same? (Can they be the same?)

## Concept: Arrays from Functions

Building arrays by adding in values is a common and useful coding pattern. Arrays can be even more useful when they are returned by functions. For instance, a function could return multiple related values at once.

The ``||sprites:array of sprites of kind||`` block (located in the ``||arrays:arrays||`` category) is one example of a function that will return an array with all of the sprites currently in the game of a particular ``||sprites:kind||``. This makes it easier to implement behaviors for several sprites like we did in example #1, especially as  sprites are continually created and destroyed as we play the game.

[![Link to Video](/static/thumbnail_play_video.png)](https://aka.ms/40546a-array-sprite2)
````

## Source lines 248-251

````text
## What did we learn?

1. How could using arrays of sprites influence the way you design games? List at least **two** ways.
2. How is using ``||sprites:array of sprites of kind||`` easier than keeping track of all the sprites in an array manually?
````
