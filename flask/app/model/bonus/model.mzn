include "globals.mzn";

% Ensembles
set of int: CLIENTS = 1..3;
enum CLIENT = {Bob, Alice, Jane};
enum FILM = {Film1,Film2, Film3};
enum SWEET = {popcorn, malteser, twix};

% Variables
array[CLIENTS] of var CLIENT: clients;
array[CLIENTS] of var FILM: films;
array[CLIENTS] of var SWEET: sweets;


constraint all_different(clients),
constraint all_different(films),
constraint all_different(sweets)