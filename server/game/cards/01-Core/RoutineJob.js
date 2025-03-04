const Card = require('../../Card.js');

class RoutineJob extends Card {
    setupCardAbilities(ability) {
        this.play({
            gameAction: ability.actions.steal(),
            then: context => ({
                message: '{0} steals an additional amber with {1}',
                gameAction: ability.actions.steal({
                    amount: context.player.discard.filter(card => card.name === 'Routine Job').length
                })
            })
        });
    }
}

RoutineJob.id = 'routine-job'; // This is a guess at what the id might be - please check it!!!

module.exports = RoutineJob;
