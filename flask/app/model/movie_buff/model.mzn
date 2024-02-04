include "globals.mzn";

% Ensembles
enum MEMBERS = {Jessica,  Laurie , Mark, Mary, Sally};
enum MOVIES = {Scarface, Scarecrow, DonnieBrasco, Minutes88, TheRecruit};
enum DAYS = {Monday, Tuesday, Wednesday, Thursday, Friday};
% nombre de minutes à partir de 7:00 pm
set of int: HOURS = {35, 40, 80, 90, 105};

set of int : SOLUTIONS = 1..5;

% Variables
array[SOLUTIONS] of var MEMBERS: member;
array[SOLUTIONS] of var MOVIES: movie;
array[SOLUTIONS] of var DAYS: day;
array[SOLUTIONS] of var HOURS: hour;

int: nbConstraint = 13;
array[1..nbConstraint] of var bool: constraints;
array[1..8] of var bool: hints;


% Contraintes
constraints = [
    all_different(member),
    all_different(movie),
    all_different(day),
    all_different(hour),
    
% Indice 1
%Jessica n'a pas choisi un des films du 21eme siècle (Minutes88 et TheRecruit). Ces derniers ont été programmé le lundi ou le vendredi.
    exists(jessica_choice in SOLUTIONS)(
    member[jessica_choice] == Jessica /\
    not (movie[jessica_choice] in {Minutes88, TheRecruit})
    ),
   
    forall(s in SOLUTIONS)(movie[s] in {Minutes88, TheRecruit} -> day[s] in {Monday, Friday}),

% Indice 2
% Le dernier film du 20ème siècle (DonnieBrasco) a été programmé à X:30 pm
    exists(s in SOLUTIONS)(movie[s] = DonnieBrasco /\ (hour[s] mod 60 = 30)), % 8:30 pm

% Indice 3
%Les films programmés avant 8:00 pm étaient des jours consécutifs. Les films programmés après 8:00 pm étaient des jours consécutifs.
    forall(d in DAYS)(
        (count([day[s] | s in SOLUTIONS], d) > 0) ->
        (
            (((d < Wednesday -> forall(s in SOLUTIONS) (day[s] = d -> hour[s] < 80)) /\
             (d >= Wednesday -> forall(s in SOLUTIONS) (day[s] = d -> hour[s] >= 80))\/
            ((d > Wednesday -> forall(s in SOLUTIONS) (day[s] = d -> hour[s] < 80)) /\
            (d <= Wednesday -> forall(s in SOLUTIONS) (day[s] = d -> hour[s] >= 80)))) \/
    
            (((d < Wednesday -> forall(s in SOLUTIONS) (day[s] = d -> hour[s] >= 80)) /\
            (d >= Wednesday -> forall(s in SOLUTIONS) (day[s] = d -> hour[s] < 80))\/
            ((d > Wednesday -> forall(s in SOLUTIONS) (day[s] = d -> hour[s] >= 80)) /\
            (d <= Wednesday -> forall(s in SOLUTIONS) (day[s] = d -> hour[s] < 80)))))
      )
      )
    ),

% Indice 4
%Mark ou Laurie avait une présentation avant 8:00 pm lundi ou vendredi. Une des femmes (Jessica, Mary, Sally) avait une présentation avant 8:00 pm lundi ou vendredi.
  exists(s_mark, s_laurie in SOLUTIONS)(
    (member[s_mark] == Mark /\ member[s_laurie] == Laurie) /\
    (
    (day[s_mark] in {Monday, Tuesday,Thursday, Friday} /\ hour[s_mark] < 80) \/
    (day[s_laurie] in {Monday, Tuesday,Thursday, Friday} /\ hour[s_laurie] < 80))
    ),

  exists(s_jessica, s_mary, s_sally in SOLUTIONS)(
    (member[s_jessica] == Jessica /\ member[s_mary] == Mary /\ member[s_sally] == Sally) /\
    (
    (day[s_jessica] in {Monday, Tuesday,Thursday, Friday} /\ hour[s_jessica] < 80) \/
    (day[s_mary] in {Monday, Tuesday,Thursday, Friday} /\ hour[s_mary] < 80) \/
    (day[s_sally] in {Monday, Tuesday,Thursday, Friday} /\ hour[s_sally] < 80))),

% Indice 5
%Mark a choisi le film Scarecrow qui a eu une présentation 65 minutes après l'heure du film Scarface. Autrement dit, le film Scarface a été programmé à 7h40 pm et Sacrecrow a été programmé à 8h45 pm.
  exists(s_mark, s_scarface in SOLUTIONS)(
  
    (member[s_mark] == Mark /\ movie[s_scarface] == Scarface) /\
    (movie[s_mark] == Scarecrow) /\ (hour[s_mark] == (hour[s_scarface] + 65))),
        


% Indice 6
%Ni Jessica ni Mary n'ont eu une présentation en jour pair.
    forall(s in SOLUTIONS)(
    member[s] in {Jessica, Mary} -> (day[s] in {Monday, Wednesday, Friday})),

% Indice 7
%Le film 88 minutes a été projeté à la fois 40 minutes avant l'heure et 40 minutes après la séance du jeudi.
    exists(m in SOLUTIONS)(
      movie[m] = Minutes88 /\(
          exists(mThu in SOLUTIONS)(
              day[mThu] = Thursday /\
              hour[m] = hour[mThu] - 40
          )
          \/
          exists(mThu in SOLUTIONS)(
              day[mThu] = Thursday /\
              hour[m] = hour[mThu] + 40
          )
      )
  ),

];

hints = [
    constraints[1] /\ constraints[2] /\ constraints[3] /\ constraints[4],
    % Indice 1
    constraints[5] /\ constraints[6],
    % Indice 2
    constraints[7],
    % Indice 3
    constraints[8],
    % Indice 4
    constraints[9] /\ constraints[10],
    % Indice 5
    constraints[11],
    % Indice 6
    constraints[12],
    % Indice 7
    constraints[13],
];

%output ["["];
%output [show(hints[i]) ++ ", " | i in 1..5-1];
%output [show(hints[5]) ++ "]"];