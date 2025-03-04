const Card = require('../../Card.js');

class ChotaHazri extends Card {
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.loseAmber(context => ({ target: context.player })),
            then: {
                may: 'forge a key',
                gameAction: ability.actions.forgeKey()
            }
        });
    }
}

ChotaHazri.id = 'chota-hazri'; // This is a guess at what the id might be - please check it!!!

module.exports = ChotaHazri;
