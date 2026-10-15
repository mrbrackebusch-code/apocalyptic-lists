# Apocalyptic Lists

### @explicitHints true

## Your code runs the room

You can see both teams' moves, values and targets. Build and edit lists to change what happens when the battle runs. The room supplies the characters and battle rules; your Blocks control the list work at each station.

Use the simulator's expand button to play at full size. Move the small observer with the arrow keys. Walk to a labeled station and press **A** to use it. Press **B** to open the menu; use **↑ / ↓** to choose and **A** to confirm. Use **Run the plan** after your station work to watch the current lists play out.

Start with **R01**. Its allied move list is empty. {{recipe:R01}} to build the first script. Keep this project as you continue: Recipe links add instructions around your own editable code.

<!-- AP_HINT cumulative=R01 -->

## Read a list, change a list

The six visible columns are independent lists. On the left are enemy values, moves and targets; on the right are allied targets, moves and values. Each column shows its current length. Row labels are indices: the first cell is **0**. A dash marks a cell beyond that list's length; it is different from an actual `Wait` move.

A station gives your code a copy of the list. Make the changes you need, then use the matching **use … as … list** block to submit that copy. The room highlights changed cells so you can compare what your code did. A target or roster entry refers to a real Sprite; the actor's displayed name helps you recognize it.

After both the task and the battle succeed, the **Exit** gate opens the next room. The B menu also offers **Retry this setup** for a fresh attempt, **Try another setup** for a changed setup, and **Revisit an unlocked room** for replay. Your earned rooms are saved; your current program remains responsible for their behavior.

If you need a complete program to compare with, use the native lightbulb hint. In later rooms, try planning the operation before opening it.

{{directory}}

<!-- AP_HINT cumulative=R01 -->
