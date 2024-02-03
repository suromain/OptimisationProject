% Use this editor as a MiniZinc scratch book
include "globals.mzn";

% Ensembles
set of int: COMPUTERS = 1..5;
set of int: PROCESSORS = {20, 23, 25, 27, 31}; % Multiplié par 10 pour convertir en int
set of int: PRICES = {699, 999, 1149, 1349, 1649};
set of int: MONITORS = {130, 150, 156, 215, 270}; % Multiplié par 10 pour convertir en int
set of int: HARD_DISK = {250, 320, 500, 750, 1024};

% Variables
array[COMPUTERS] of PROCESSORS: processor;
array[COMPUTERS] of PRICES: price;
array[COMPUTERS] of MONITORS: monitor;
array[COMPUTERS] of HARD_DISK: hardDisk;

var COMPUTERS: andrews_choice;

array[1..5] of var bool: hints;

hints = [(all_different(processor) /\ all_different(price) /\ all_different(monitor) /\ all_different(hardDisk)),

% Indice 1
%Andrew a acheté l'ordinateur qui coûtait trois cents euros de moins que le PC qui a un processeur de 0,4 MHz plus puissant que celui qui a un écran de 21,5 pouces.
(exists(p04, e215 in COMPUTERS)(
    monitor[e215] = 215 /\
    processor[p04] == (processor[e215] + 4) /\ 
    price[andrews_choice] == (price[p04] - 300) 
    )),
% Indice 2
%Les cinq ordinateurs sont : celui choisi par Andrew (qui n'a pas l'écran 27'), celui qui a le processeur 2.0 MHz, l'ordinateur qui a un disque dur de 250 GB, celui qui a un prix de 1 149 euros et l'ordinateur (qui n'a pas l'écran 15') qui a un disque dur plus grand que celui choisi par Andrew mais plus petit que celui qui a le processeur 2.7 MHz.
(exists(o1, o2, o3, o4, o5 in COMPUTERS)(
    all_different([o1, o2, o3, o4, o5]) /\
    o1 == andrews_choice /\
    monitor[o1] != 270 /\
    processor[o2] = 20 /\
    hardDisk[o3] = 250 /\
    price[o4] = 1149 /\
    monitor[o5] != 150 /\
    hardDisk[o5] > hardDisk[o1] /\
    exists(c27 in COMPUTERS)(
    processor[c27] = 27 /\ hardDisk[o5] < hardDisk[c27] 
    )
 )),
% Indice 3
%L'ordinateur avec le disque dur de 320 Go a un processeur de 2.0 ou 2.3 MHz. Le processeur de l'ordinateur qui a l'écran 15' est plus puissant que celui de l'ordinateur qui coûte 999 euros mais moins puissant que le processeur qui est inclus dans l'ordinateur de 1 349 euros.    
(exists(c in COMPUTERS)(
    hardDisk[c] == 320 /\ (processor[c] == 20 \/ processor[c] == 23)
    ) /\
    exists(c in COMPUTERS)(
    monitor[c] == 150 
    /\ exists(c999 in COMPUTERS)(price[c999] = 999 /\ processor[c] > processor[c999])
    /\ exists(c1349 in COMPUTERS)(price[c1349] = 1349 /\ processor[c] < processor[c1349])
    )),
% Indice 4
%L'ordinateur qui a un écran de 27 pouces n'a pas de disque dur de 320 Gb. Le disque dur de 500 Go est inclus dans l'ordinateur qui a un processeur plus puissant et un écran plus grand que celui qui coûte que celui qui coûte 699 euros (qui n'inclut pas le disque dur de 320 Go).
(exists(c in COMPUTERS)(monitor[c] = 270 /\ hardDisk[c] != 320) /\
exists(c in COMPUTERS)(
          hardDisk[c] = 500 /\ 
          exists(c699 in COMPUTERS)(
                  price[c699] = 699 /\ processor[c] > processor[c699] /\ monitor[c] > monitor[c699]
          )
))];