

# Puzzle Customizer 
## Setup

Pour initialiser la db, se mettre dans le répertoire flask et taper la commande : 

```bash
flask --app app init-db
```

## API :

Connecteurs logiques possibles : ```AND, OR, IMPLIES```

Comparateurs possibles : ```EQ, NEQ```

next est la suite de la comparaison, elle n'est pas requise.

La déclaration d'une contrainte est : 
```json
{
    "negative" : true,
    "atom" : { "comparator" : "EQ" , "operand" : "object1" },
    "next" : {
        "connector" : "AND",
        "constraint" : {
            // récursivement... 
        }
    }
}
```

