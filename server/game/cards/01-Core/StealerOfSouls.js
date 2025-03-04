const Card = require('../../Card.js');

class StealerOfSouls extends Card {
    setupCardAbilities(ability) {
        this.reaction({
            when: {
                onDamageDealt: (event, context) => event.damageSource === context.source && event.destroyed
            },
            gameAction: [
                ability.actions.purge(context => ({ target: context.event.card.location === 'discard' ? context.event.card : [] })),
                ability.actions.gainAmber()
            ]
        });
    }
}

StealerOfSouls.id = 'stealer-of-souls'; // This is a guess at what the id might be - please check it!!!

module.exports = StealerOfSouls;
