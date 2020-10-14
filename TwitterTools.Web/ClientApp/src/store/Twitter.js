"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = exports.TwitterActionTypes = void 0;
var TwitterActionTypes = /** @class */ (function () {
    function TwitterActionTypes() {
    }
    TwitterActionTypes.REQUEST_TotalTweetsReceived = 'REQUEST_TotalTweetsReceived';
    TwitterActionTypes.RECEIVE_TotalTweetsReceived = 'RECEIVE_TotalTweetsReceived';
    TwitterActionTypes.REQUEST_PercentTweetsContainsEmojis = 'REQUEST_PercentTweetsContainsEmojis';
    TwitterActionTypes.RECEIVE_PercentTweetsContainsEmojis = 'RECEIVE_PercentTweetsContainsEmojis';
    TwitterActionTypes.REQUEST_TopHashTags = 'REQUEST_TopHashTags';
    TwitterActionTypes.RECEIVE_TopHashTags = 'RECEIVE_TopHashTags';
    return TwitterActionTypes;
}());
exports.TwitterActionTypes = TwitterActionTypes;
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
exports.actionCreators = {
    requestTopHashTags: function () { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.twitter) {
            fetch('twitter/get-top-hashtags')
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: 'RECEIVE_TopHashTags', topHashTags: data });
            });
            dispatch({ type: 'REQUEST_TopHashTags' });
        }
    }; }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = { topHashTags: [] };
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case 'REQUEST_TopHashTags':
            break;
        case 'RECEIVE_TopHashTags':
            return {
                //topHashTags: state.topHashTags.concat(action.topHashTags.filter(m => state.topHashTags.find(x => x.top == m.top && x.name == m.name) == null || m.top == 2))
                topHashTags: action.topHashTags
                //topHashTags: action.topHashTags                
            };
    }
    return state;
};
//# sourceMappingURL=Twitter.js.map