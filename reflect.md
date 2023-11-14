Reflection:

Some things I learned:
- making a game with no external tools, libraries, game engines etc. is a challenging but
rewarding experience once you accomplish it!
- learned how to move things across the screen, whether that be a bullet with a fixed flight,
or an input controlled character.
- also learned how to make "collisions", which was the most important functionality for me to implement
    - adding "hurtboxes" which represent a collision box smaller than what is visually shown for enemies and the character.
    was a great addition, as it made the game feel less frustrating and more fair.

Some key challenges:
- I knew I wanted a game loop for my game, so that I could update the game state a fixed number of ticks a second.
After failed attempts myself, I used chatGPT to make one, and it turned out to work exactly how I wanted. Once I read over
the code it produced and tried it out, it made sense to me how the game loop functions, and it let me easily understand
how to use it with my game.
- collisions in my game have a bumpy history. Ideally I wanted each enemy to not overlap with each other to make the gameplay
make a bit more sense, but I tried very hard to no avail. I ended up comprimising and allowing the enemies to overlap with
each other as they chase the player around, and it turned out better than expected the more I played the game.

Managing complexity:
I knew exactly what type of game I wanted to create from the start, and exactly what features need to be present to have a
functioning game. One key feature that I didn't end up making was an economy system; killing enemies grants money, which you
use to buy more ammo which is now a resource, as well as purchasing new weapons. I decided to polish the current gameplay loop
insetad of trying to tackle all of that too, to ensure I ended up with a product with fleshed out features and nothing I am not
proud of.