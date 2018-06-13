# babushka [drawbushka]
что наверху, бабушка?

By Jawad Kadir, Leo Liu (PM), Arif Roktim, and Michael Ruvinshteyn

[proto0](http://drawbushka.me/draw)

It's basically a drawing party game that can go in two different ways:
 
Drawful:
At the start of the game, players draw whatever they want and then type what they want to "title" their drawing. After time is up, everyone will have the chance to "title" everyone else's drawings. After this is done, one picture will be shown with all the possible titles and players (besides the original drawer) will pick a title. Players who pick the original drawer's title wins the most points. If another player's title is chosen, that player who wrote the title will receive points. Repeat until all the pictures are shown and the winner is the one with the most points
Ex of game-play) Player A is the original drawer and his title is "Dog". Player B titles the picture "Cat". Let's say Player C selected the title ""Dog"" after the draw and naming phase is over. Player C will receive points for getting the right answer. Say Player D picked the title "Cat"; Player B will then receive points.

## Launch Instructions

### 1. Clone this repository

#### ssh:

`git clone git@github.com:TakingTheL/babushka.git`

#### https:

`git clone https://github.com/TakingTheL/babushka.git`

### 2. Prepare for launch

#### Virtualenv

We recommend you use a virtual environment to install dependencies for this site.

[To install virtualenv](https://virtualenv.pypa.io/en/stable/installation/)

[To create a virtualenv](https://virtualenv.pypa.io/en/stable/reference/#virtualenv-command)

To activate virtualenv in a Unix-based system:

`$ . <name of virtualenv>/bin/activate`

#### Install dependencies

With an activated virtualenv:

`pip install Flask`

### 3. Launch

In the repository for this site:

`python drawbushka/__init__.py`

In a browser, navigate to:

`localhost:5000`
