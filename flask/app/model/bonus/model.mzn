include "globals.mzn";

% Ensembles
set of int: SOLUTIONS = 1..3;
enum PERSONNE = {Bob, Alice, Jane};
enum LIEU = {Gare,Aeroport,Port};
enum OBJET = {Cles, Tournevis, Lunettes};

% Variables
array[SOLUTIONS] of var PERSONNE: personnes;
array[SOLUTIONS] of var LIEU: lieux;
array[SOLUTIONS] of var OBJET: objets;


constraint all_different(personnes);
constraint all_different(lieux);
constraint all_different(objets);

constraint exists(a in SOLUTIONS)( personnes[a] == Jane \/ ( lieux[a] != Gare ));
constraint exists(a in SOLUTIONS)( not (lieux[a] != Aeroport -> ( objets[a] == Tournevis )));