import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import * as ActionTypes from './ActionTypes';
// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface TwitterQueryState {
    queryResult: string;
    requestQuery: string;
    isLoading: boolean;
}


// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestDisplayAction {
    type: 'REQUEST_DISPLAY_PAGE';
}

interface ReceiveDisplayAction {
    type: 'RECEIVE_DISPLAY_PAGE';
}


interface RequestTwitterQueryAction {
    type: 'REQUEST_TWITTER_QUERY';
    query: string;
}

interface ReceiveTwitterQueryResultAction {
    type: 'RECEIVE_TWITTER_QUERY_RESULT';
    queryResult: string;
}

interface SetTwitterQueryAction {
    type: 'SET_TWITTER_QUERY';
    query: string;
}


// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestDisplayAction | ReceiveDisplayAction | RequestTwitterQueryAction | ReceiveTwitterQueryResultAction | SetTwitterQueryAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestTwitterQuery: (requestQuery: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.twitterQuery && requestQuery !== undefined && requestQuery !== null && requestQuery !== '') {
            //fetch('twitter/search?query=' + requestQuery)
            fetch('twitter/call?url=' + requestQuery)
                .then(response => response.json() as Promise<string>)
                .then(data => {
                    dispatch({ type: ActionTypes.RECEIVE_TWITTER_QUERY_RESULT, queryResult: JSON.stringify(data) });
                });

            dispatch({ type: ActionTypes.REQUEST_TWITTER_QUERY, query: requestQuery });

        }
    },
    setTwitterQuery: (requestQuery: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.twitterQuery && appState.twitterQuery.requestQuery !== requestQuery)
            dispatch({ type: ActionTypes.SET_TWITTER_QUERY, query: requestQuery });
    }
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: TwitterQueryState = { queryResult: '', isLoading: false, requestQuery: 'https://api.twitter.com/1.1/search/tweets.json?q=%40twitterdev' };

export const reducer: Reducer<TwitterQueryState> = (state: TwitterQueryState | undefined, incomingAction: Action): TwitterQueryState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case ActionTypes.REQUEST_TWITTER_QUERY:
            return {
                ...state,
                isLoading: true,
                requestQuery: action.query
            }
            
        case ActionTypes.RECEIVE_TWITTER_QUERY_RESULT:
            return {
                ...state,
                queryResult: action.queryResult,
                isLoading: false
            }
        case ActionTypes.SET_TWITTER_QUERY:
            return {
                ...state,
                isLoading: true,
                requestQuery: action.query
            }

    }
    return state;
};
