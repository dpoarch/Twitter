"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.actionCreators = void 0;
var ActionTypes = require("./ActionTypes");
// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).
exports.actionCreators = {
    requestTwitterQuery: function (requestQuery) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.twitterQuery && requestQuery !== undefined && requestQuery !== null && requestQuery !== '') {
            //fetch('twitter/search?query=' + requestQuery)
            fetch('twitter/call?url=' + requestQuery)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({ type: ActionTypes.RECEIVE_TWITTER_QUERY_RESULT, queryResult: JSON.stringify(data) });
            });
            dispatch({ type: ActionTypes.REQUEST_TWITTER_QUERY, query: requestQuery });
        }
    }; },
    setTwitterQuery: function (requestQuery) { return function (dispatch, getState) {
        var appState = getState();
        if (appState && appState.twitterQuery && appState.twitterQuery.requestQuery !== requestQuery)
            dispatch({ type: ActionTypes.SET_TWITTER_QUERY, query: requestQuery });
    }; }
};
// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.
var unloadedState = { queryResult: '', isLoading: false, requestQuery: 'https://api.twitter.com/1.1/search/tweets.json?q=%40twitterdev' };
exports.reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case ActionTypes.REQUEST_TWITTER_QUERY:
            return __assign(__assign({}, state), { isLoading: true, requestQuery: action.query });
        case ActionTypes.RECEIVE_TWITTER_QUERY_RESULT:
            return __assign(__assign({}, state), { queryResult: action.queryResult, isLoading: false });
        case ActionTypes.SET_TWITTER_QUERY:
            return __assign(__assign({}, state), { isLoading: true, requestQuery: action.query });
    }
    return state;
};
//# sourceMappingURL=TwitterQuery.js.map