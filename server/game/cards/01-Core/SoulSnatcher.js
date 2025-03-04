const Card = require('../../Card.js');

class SoulSnatcher extends Card {
    setupCardAbilities(ability) {
        this.constantReaction({
            when: {
                onCardDestroyed: event => event.card.type === 'creature'
            },
            gameAction: ability.actions.gainAmber(context => ({
                target: context.event.card.owner
            }))
        });
    }
}

SoulSnatcher.id = 'soul-snatcher';

module.exports = SoulSnatcher;
