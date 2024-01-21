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

int: nbConstraint = 16;
array[1..nbConstraint] of var bool: constraints;
array[1..5] of var bool: hints;

constraints = [
    all_different(processor),
    all_different(price),
    all_different(monitor),
    all_different(hardDisk),

% Indice 1
%Andrew a acheté l'ordinateur qui coûtait trois cents euros de moins que le PC qui a un processeur de 0,4 MHz plus puissant que celui qui a un écran de 21,5 pouces.
    forall(c in COMPUTERS)(
    if monitor[c] = 215 then
        exists(d in COMPUTERS)(
            price[1] = price[d] - 300 /\ processor[d] = processor[c] + 4
        )
    endif
    ),
% Indice 2
%Les cinq ordinateurs sont : celui choisi par Andrew (qui n'a pas l'écran 27'), celui qui a le processeur 2.0 MHz, l'ordinateur qui a un disque dur de 250 GB, celui qui a un prix de 1 149 euros et l'ordinateur (qui n'a pas l'écran 15') qui a un disque dur plus grand que celui choisi par Andrew mais plus petit que celui qui a le processeur 2.7 MHz.
    monitor[1] != 270,
    processor[2] = 20,
    hardDisk[3] = 250,
    price[4] = 1149,
    monitor[5] != 150,
    hardDisk[5] > hardDisk[1],
    exists(c in COMPUTERS)(
    processor[c] = 27 /\ hardDisk[c] > hardDisk[5]
    ),
% Indice 3
%L'ordinateur avec le disque dur de 320 Go a un processeur de 2.0 ou 2.3 MHz. Le processeur de l'ordinateur qui a l'écran 15' est plus puissant que celui de l'ordinateur qui coûte 999 euros mais moins puissant que le processeur qui est inclus dans l'ordinateur de 1 349 euros.    
    forall(c in COMPUTERS)(
    hardDisk[c] = 320 -> (processor[c] = 20 \/ processor[c] = 23)
    ),
    forall(c in COMPUTERS)(
    if monitor[c] = 150 then
        forall(d in COMPUTERS)(
            if price[d] = 999 then
                processor[c] > processor[d]
            endif
        ) /\
        forall(d in COMPUTERS)(
            if price[d] = 1349 then
                processor[c] < processor[d]
            endif
        )
    endif
    ),
% Indice 4
%L'ordinateur qui a un écran de 27 pouces n'a pas de disque dur de 320 Gb. Le disque dur de 500 Go est inclus dans l'ordinateur qui a un processeur plus puissant et un écran plus grand que celui qui coûte que celui qui coûte 699 euros (qui n'inclut pas le disque dur de 320 Go).
    forall(c in COMPUTERS)(
    monitor[c] = 270 -> hardDisk[c] != 320
    ),
    forall(c in COMPUTERS)(
    if hardDisk[c] = 500 then
        forall(d in COMPUTERS)(
            if price[d] = 699 then
                processor[c] > processor[d] /\ monitor[c] > monitor[d]
            endif
        )
    endif
    ),

];

hints = [
    constraints[1] /\ constraints[2] /\ constraints[3] /\ constraints[4],
    % Indice 1
    constraints[5],
    % Indice 2
    constraints[6] /\ constraints[7] /\ constraints[8] /\ constraints[9] /\ constraints[10] /\ constraints[11] /\ constraints[12],
    % Indice 3
    constraints[13] /\ constraints[14],
    % Indice 4
    constraints[15] /\ constraints[16],
];

% output ["["];
% output [show(hints[i]) ++ ", " | i in 1..5-1];
% output [show(hints[5]) ++ "]"];
