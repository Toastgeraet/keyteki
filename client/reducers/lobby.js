const defaultState = {
    games: [],
    users: [],
    messages: []
};

export default function (state = defaultState, action) {
    switch(action.type) {
        case 'LOBBY_CONNECTING':
            return Object.assign({}, state, {
                connecting: true,
                connected: false,
                socket: action.socket
            });
        case 'LOBBY_CONNECTED':
            return Object.assign({}, state, {
                connecting: false,
                connected: true
            });
        case 'LOBBY_DISCONNECTED':
            return Object.assign({}, state, {
                connecting: false,
                connected: false
            });
        case 'LOBBY_RECONNECING':
            return Object.assign({}, state, {
                connected: false,
                connecting: true
            });
        case 'LOBBY_MESSAGE_RECEIVED':
            return handleMessage(action, state);
        case 'LOBBY_MESSAGE_DELETED':
            return handleMessage(action, state);
        case 'JOIN_PASSWORD_GAME':
            return Object.assign({}, state, {
                passwordGame: action.game,
                passwordJoinType: action.joinType
            });
        case 'CANCEL_PASSWORD_JOIN':
            return Object.assign({}, state, {
                passwordGame: undefined,
                passwordError: undefined,
                passwordJoinType: undefined
            });
        case 'GAME_SOCKET_CLOSED':
            return Object.assign({}, state, {
                currentGame: undefined,
                newGame: false
            });
        case 'PROFILE_SAVED':
            if(state.socket) {
                state.socket.emit('authenticate', action.response.token);
            }
            break;
        case 'START_NEWGAME':
            return Object.assign({}, state, {
                newGame: true
            });
        case 'CANCEL_NEWGAME':
            return Object.assign({}, state, {
                newGame: false
            });
    }

    return state;
}

function handleGameState(action, state) {
    let retState = Object.assign({}, state, {
        currentGame: action.args[0]
    });

    var username = action.args[1];

    var currentState = retState.currentGame;
    if(!currentState) {
        retState.newGame = false;
        return retState;
    }

    if(currentState && currentState.spectators.some(spectator => {
        return spectator.name === username;
    })) {
        return retState;
    }

    if(!currentState || !currentState.players[username] || currentState.players[username].left) {
        delete retState.currentGame;
        retState.newGame = false;
    }

    if(currentState) {
        delete retState.passwordGame;
        delete retState.passwordJoinType;
        delete retState.passwordError;
    }

    return retState;
}

function handleMessage(action, state) {
    let newState = state;

    switch(action.message) {
        case 'games':
            newState = Object.assign({}, state, {
                games: action.args[0]
            });

            // If the current game is no longer in the game list, it must have been closed
            if(state.currentGame && !action.args[0].some(game => {
                return game.id === state.currentGame.id;
            })) {
                newState.currentGame = undefined;
                newState.newGame = false;
            }

            break;
        case 'users':
            newState = Object.assign({}, state, {
                users: action.args[0]
            });

            break;
        case 'newgame':
            newState = Object.assign({}, state, {
                currentGame: action.args[0],
                newGame: false
            });

            break;
        case 'passworderror':
            newState = Object.assign({}, state, {
                passwordError: action.args[0]
            });

            break;
        case 'lobbychat':
            newState = Object.assign({}, state, {
                messages: [
                    ...state.messages, action.args[0]
                ]
            });

            break;
        case 'lobbymessages':
            newState = Object.assign({}, state, {
                messages: action.args[0]
            });

            break;
        case 'removemessage':
            newState = Object.assign({}, state);

            newState.messages = newState.messages.filter(message => {
                return message._id !== action.args[0];
            });

            break;
        case 'banner':
            newState = Object.assign({}, state, {
                notice: action.args[0]
            });

            break;
        case 'gamestate':
            newState = handleGameState(action, state);

            break;
        case 'cleargamestate':
            newState = Object.assign({}, state, {
                newGame: false
            });

            newState.currentGame = undefined;

            break;
    }

    return newState;
}
