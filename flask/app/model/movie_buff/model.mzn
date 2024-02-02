include "globals.mzn";

% Ensembles
enum MEMBERS = {Sally, Mark, Jessica, Laurie, Mary};
enum MOVIES = {Scarface, Scarecrow, DonnieBrasco, Minutes88, TheRecruit};
enum DAYS = {Monday, Tuesday, Wednesday, Thursday, Friday};
% nombre de minutes à partir de 7:00 pm
set of int: HOURS = {35, 40, 80, 90, 105};

% Variables
array[MEMBERS] of var MEMBERS: member;
array[MEMBERS] of var MOVIES: movie;
array[MEMBERS] of var DAYS: day;
array[MEMBERS] of var HOURS: hour;

int: nbConstraint = 14;
array[1..nbConstraint] of var bool: constraints;
array[1..8] of var bool: hints;


% Contraintes
constraints = [
    all_different(member),
    all_different(movie),
    all_different(day),
    all_different(hour),

% Indice 1
%Jessica a choisi un des films parmis Donnie Brasco,Scarecrow et Scarface. Elles n'a donc pas choisi 88 Minutes ni The Recruit. Les films 88 Minutes et The Recruit ont été programmé le lundi ou le vendredi.
    movie[Jessica] = DonnieBrasco \/ movie[Jessica] = Scarecrow \/ movie[Jessica] = Scarface,
    forall(m in MEMBERS)(movie[m] in {Minutes88, TheRecruit} -> day[m] in {Monday, Friday}),

% Indice 2
% Le film Donnie Brasco a été programmé à 8:30 pm
    exists(m in MEMBERS)(movie[m] = DonnieBrasco /\ hour[m] = 90), % 8:30 pm

% Indice 3
%Les films programmés avant 8:00 pm étaient des jours consécutifs. Les films programmés après 8:00 pm étaient des jours consécutifs.
    forall(d in DAYS)(
        (count([day[m] | m in MEMBERS], d) > 0) ->
        (
            (((d < Wednesday -> forall(m in MEMBERS) (day[m] = d -> hour[m] < 80)) /\
             (d >= Wednesday -> forall(m in MEMBERS) (day[m] = d -> hour[m] >= 80))\/
            ((d > Wednesday -> forall(m in MEMBERS) (day[m] = d -> hour[m] < 80)) /\
            (d <= Wednesday -> forall(m in MEMBERS) (day[m] = d -> hour[m] >= 80)))) \/
    
            (((d < Wednesday -> forall(m in MEMBERS) (day[m] = d -> hour[m] >= 80)) /\
            (d >= Wednesday -> forall(m in MEMBERS) (day[m] = d -> hour[m] < 80))\/
            ((d > Wednesday -> forall(m in MEMBERS) (day[m] = d -> hour[m] >= 80)) /\
            (d <= Wednesday -> forall(m in MEMBERS) (day[m] = d -> hour[m] < 80)))))
      )
      )
    ),

% Indice 4
%Mark ou Laurie avait une présentation avant 8:00 pm lundi ou vendredi. Une des femmes (Jessica, Mary, Sally) avait une présentation avant 8:00 pm lundi ou vendredi.
    (day[Mark] in {Monday, Tuesday,Thursday, Friday} /\ hour[Mark] < 80) \/
    (day[Laurie] in {Monday, Tuesday,Thursday, Friday} /\ hour[Laurie] < 80),

    (day[Jessica] in {Monday, Tuesday,Thursday, Friday} /\ hour[Jessica] < 80) \/
    (day[Mary] in {Monday, Tuesday,Thursday, Friday} /\ hour[Mary] < 80) \/
    (day[Sally] in {Monday, Tuesday,Thursday, Friday} /\ hour[Sally] < 80),

% Indice 5
%Mark a choisi le film Scarecrow qui a eu une présentation 65 minutes après l'heure du film Scarface. Autrement dit, le film Scarface a été programmé à 7h40 pm et Sacrecrow a été programmé à 8h45 pm.
    movie[Mark] = Scarecrow /\ hour[Mark] = 105,
    
    exists(m in MEMBERS)(movie[m] = Scarface /\ hour[m] = 40 ), % 7:40 pm
    


% Indice 6
%Ni Jessica ni Mary n'ont eu une présentation le mardi ni le jeudi.
    forall(m in {Jessica, Mary})(day[m] in {Monday, Wednesday, Friday}),

% Indice 7
%Le film 88 minutes a été projeté à la fois 40 minutes avant l'heure et 40 minutes après la séance du jeudi.
    exists(m in MEMBERS)(
      movie[m] = Minutes88 /\(
          exists(mThu in MEMBERS)(
              day[mThu] = Thursday /\
              hour[m] = hour[mThu] - 40
          )
          \/
          exists(mThu in MEMBERS)(
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
    constraints[11] /\ constraints[12],
    % Indice 6
    constraints[13],
    % Indice 7
    constraints[14],
];

%output ["["];
%output [show(hints[i]) ++ ", " | i in 1..5-1];
%output [show(hints[5]) ++ "]"];