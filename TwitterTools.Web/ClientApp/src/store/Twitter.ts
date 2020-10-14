import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.
export interface TwitterState {
    topHashTags: Place[];
    isLoading: boolean;
}

export interface Place {
    trends: HashTag[];
    as_of: string;
    created_at: string;
    locations: Location[];
}

export interface Location {
    name: string;
    woeid: number;
}

export interface HashTag {    
    tweet_volume: number;
    name: string;
    query: string;
    promoted_content: string;
    url: string;
}

export interface DomainUrl {
    isLoading: boolean;
    tweet_volume: number;
    name: string;
    query: string;
    promoted_content: string;
    url: string;
}

export class TwitterActionTypes {
    public static readonly REQUEST_TotalTweetsReceived = 'REQUEST_TotalTweetsReceived';
    public static readonly RECEIVE_TotalTweetsReceived = 'RECEIVE_TotalTweetsReceived';
    public static readonly REQUEST_PercentTweetsContainsEmojis = 'REQUEST_PercentTweetsContainsEmojis';
    public static readonly RECEIVE_PercentTweetsContainsEmojis = 'RECEIVE_PercentTweetsContainsEmojis';
    public static readonly REQUEST_TopHashTags = 'REQUEST_TopHashTags';
    public static readonly RECEIVE_TopHashTags = 'RECEIVE_TopHashTags';
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestTopHashTagsAction {
    type: 'REQUEST_TopHashTags';
}

interface ReceiveTopHashTagsAction {
    type: 'RECEIVE_TopHashTags';
    topHashTags: Place[];
    
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =  RequestTopHashTagsAction | ReceiveTopHashTagsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestTopHashTags: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.twitter) {
            fetch('twitter/get-top-hashtags')
                .then(response => response.json() as Promise<Place[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_TopHashTags', topHashTags: data});
                });

            dispatch({ type: 'REQUEST_TopHashTags' });
            
        }
    } 
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: TwitterState = {topHashTags: [], isLoading: true};

export const reducer: Reducer<TwitterState> = (state: TwitterState | undefined, incomingAction: Action): TwitterState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_TopHashTags':
            return {
                ...state,
                isLoading: true
            }
            
        case 'RECEIVE_TopHashTags':            
            return {
                //topHashTags: state.topHashTags.concat(action.topHashTags.filter(m => state.topHashTags.find(x => x.top == m.top && x.name == m.name) == null || m.top == 2))
                topHashTags: action.topHashTags,
                isLoading: false                
            }        
    }
    return state;
};
