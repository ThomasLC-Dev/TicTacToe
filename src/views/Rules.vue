<template>
    <div class="rules-view">
        <div class="tic-tac-toe-rules">
            <h2>Règles du TicTacToe</h2>
            <ul>
                <li v-for="(rule, index) in rulesTicTacToe" :key="index">{{rule}}</li>
            </ul>
        </div>
        <div class="gobblet-rules">
            <h2>Règles du Gobblet</h2>
            <ul>
                <li v-for="(rule, index) in rulesGobblet" :key="index">{{rule}}</li>
            </ul>
        </div>
    </div>
</template>

<script>

export default{
    name: "RulesView",
    data() {
        return{
            rulesTicTacToe: [
                "Jeu qui se joue à deux joueurs, sur un damier de 3 cases par 3 cases.",
                "Chaque joueur est représenté par un \"symbole\"",
                "Un joueur utilise toujours le même type de \"symbole\"",
                "Un premier joueur dessine son symbole sur une case. Puis c'est au tour de l'autre joueur de dessiner son symbole sur une case vide.",
                "Le but du jeu est de réussir à aligner ses trois symboles (horizontal, vertical ou diagonale), on remporte alors la partie.",
                "Si la grille est remplie et qu'aucune ligne ne comporte trois symboles identiques, les joueurs finissent par un match nul."
            ],
            rulesGobblet: [
                "Gobblet est un vrai jeu qui se joue sur un damier de 4 cases par 4 cases.",
                "Chaque joueur dispose de 12 jetons en forme de gobelets ayant le \"symbole\" : (3 petits gobelets, 3 moyens gobelets, 3 grands gobelets, 3 très grand gobelets)",
                "Avant de commencer à jouer, vous devrez empiler ceux-ci, les petits dans les grands. Ceci fait vous devrez prendre les pions dans l’ordre et donc commencer à jouer avec un grand.",
                "Le but du jeu est simple : réaliser une ligne avec 4 pions de sa couleur (quelle que soit leur taille).",
                "Chaque joueur à son tour a le choix entre deux possibilités :",
                "Amener un nouveau gobelet en jeu sur une case vide de son choix.",
                "Prendre un gobelet déjà posé et le reposer sur une case de son choix. Soit vide, soit contenant un gobelet plus petit à l’adversaire ou à soi : C’est le gobage.",
                "Gober une pièce adverse permet de la faire disparaître. Mais si le gobelet qui l’a capturé se déplace, il libérera le captif.",
                "Gober une des ses pièces permet de protéger une pièce plus petite (qui se fait gober par tous les plus gros qu’elle) ou de se faire oublier pour réapparaître plus tard.",
                "Si d’aventure votre adversaire réalise un alignement de 3, il est possible d’amener en jeu un nouveau gobelet même sur une case occupée. C’est la seule manière de pouvoir gober en mettant un gobelet en jeu."
            ]
        }
    }
}

</script>

<style>

.rules-view{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 90%;
    margin: 20px auto 0;
}

.tic-tac-toe-rules{
    flex: 1;
}

.gobblet-rules{
    flex: 1;
}

.tic-tac-toe-rules ul, .gobblet-rules ul{
    margin: 20px auto 0;
    /* list-style: none; */
    width: 80%;
    text-align: left;
}

.rules-view li{
    margin: 10px 0;
}

/* .rules-view li::before{
    display: block;
    content: '';
    width: 60%;
    height: 1px;
    background-color: #FFF;
    margin: 10px auto;
} */

@media(max-width: 1200px){
    .rules-view{
        flex-direction: column;
    }

    .gobblet-rules{
        margin-top: 50px;
    }
}

</style>