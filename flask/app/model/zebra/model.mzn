include "globals.mzn";

set of int: WOMAN = 1..5;
enum TSHIRT = {blue, green, red ,white, yellow};
enum NAME = {andrea,holly, julie, leslie, victoria};
enum SURNAME = {brown, davis, lopes, miller, wilson};
enum PASTA = {farfalle, lasagne, penne, spaghetti, ravioli};
enum WINE = {australian, argentine,chilean, french, italian};
set of int: AGE = {30, 35, 40, 45, 50};

array[WOMAN] of TSHIRT: tshirt;
array[WOMAN] of NAME: name;
array[WOMAN] of SURNAME: surname;
array[WOMAN] of PASTA: pasta;
array[WOMAN] of WINE: wine;
array[WOMAN] of AGE: age;


int: nbConstraint = 28;
array[1..nbConstraint] of var bool: constraints;

constraints = [
     all_different(tshirt),
     all_different(name),
     all_different(surname),
     all_different(pasta),
     all_different(wine),
     all_different(age),
 exists(a1, a2 in WOMAN) (tshirt[a1]==white /\ wine[a2]==italian /\ abs(a1-a2)==1 ),
 exists(a1,a2,a3 in WOMAN) (surname[a1]==davis /\ surname[a2]==miller /\ surname[a3]==brown /\ a1<a2 /\ a2<a3),
 exists(a in WOMAN) (a==3 /\ age[a]==30),
 exists(a1, a2 in WOMAN) (tshirt[a1]==red /\ age[a2]==45 /\ a1<a2),
 exists(a in WOMAN) (wine[a]==chilean /\ pasta[a]==farfalle),
 exists(a in WOMAN) (a==1 /\ wine[a]==argentine),
 exists(a1, a2 in WOMAN) (name[a1]==andrea /\  age[a2]=35 /\ a1-1==a2),
 exists(a1, a2, a3 in WOMAN) (surname[a1]==davis /\ name[a3]==holly /\ a1<a2 /\ a2<a3 /\ tshirt[a2]==blue),
 exists(a1, a2 in WOMAN) (name[a1]==leslie /\ name[a2]==victoria /\ abs(a1-a2)==1),
 exists(a1, a2 in WOMAN) (tshirt[a1]==red /\ a1<a2 /\ wine[a2]==australian),
 exists(a1, a2 in WOMAN) (surname[a1]==wilson /\ abs(a1-a2)==1 /\ age[a2]==30),
 exists(a1, a2 in WOMAN) (name[a1]==leslie /\ a1=a2-1 /\ age[a2]==30),
 exists(a1, a2 in WOMAN) (name[a1]==holly /\ a1>a2 /\ tshirt[a2]==red),
 exists(a1, a2 in WOMAN) (surname[a1]==brown /\ a1=a2-1 /\ name[a2]==julie),
 exists(a in WOMAN) (age[a]==30 /\ pasta[a]==penne),
 exists(a in WOMAN) (surname[a]==wilson /\ tshirt[a]==white),
 exists(a1, a2, a3 in WOMAN) (a1<a2 /\ a2<a3 /\ wine[a1]==italian /\ pasta[a2]==lasagne /\ pasta[a3]==spaghetti),
 exists(a in WOMAN) (a==2 /\ tshirt[a]==blue),
 exists(a in WOMAN) (age[a]==40 /\ pasta[a]==lasagne),
 exists(a in WOMAN) (a=5 /\ surname[a]==lopes),
 exists(a1,a2,a3 in WOMAN) (a1<a2 /\ a2<a3 /\ name[a1]==victoria /\ wine[a2]==australian /\ wine[a3]==french),
 exists(a1, a2 in WOMAN) (a1=a2-1 /\ tshirt[a1]==yellow /\ age[a2]==35),
];


% output ["["];
% output [show(constraints[i]) ++ ", " | i in 1..nbConstraint-1];
% output [show(constraints[nbConstraint]) ++ "]"];



