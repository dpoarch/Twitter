import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as TwitterQueryStore from '../store/TwitterQuery';

// At runtime, Redux will merge together...
type TwitterQueryProps =
    TwitterQueryStore.TwitterQueryState // ... state we've requested from the Redux store
    & typeof TwitterQueryStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ query: string }>; // ... plus incoming routing parameters


class TwitterQuery extends React.PureComponent<TwitterQueryProps> {
    
    constructor(props:any) {
        super(props);
        
        //const { requestQuery } = props;
        //const { queryResult } = props;

        this.executeTwitterQuery.bind(this);
        

    }
    // This method is called when the component is first added to the document
    public componentDidMount() {
        
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        //this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">Twitter Query</h1>
                <p>This will query on Twitter API</p>
                {this.renderQueryInput()}
                {this.renderQueryOutput()}
            </React.Fragment>
        );
    }

    private executeTwitterQuery(e: React.MouseEvent) {
        e.preventDefault();
        this.props.requestTwitterQuery(this.props.requestQuery);
    }

    private onChangeTwitterQuery(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.props.setTwitterQuery(e.target.value);
    }

    private renderQueryInput() {
        return (
            <React.Fragment>
                <p>https://developer.twitter.com/en/docs/twitter-api/v1/rules-and-filtering/guides/build-standard-queries</p>
                <p>https://developer.twitter.com/en/docs/twitter-api/v1/rules-and-filtering/guides/using-premium-operators</p>

                <div className="rows">
                    <div className="form-group">
                        <label>Enter Query: </label>
                        <textarea className='form-control' rows={4} id="twitterQueryInput" defaultValue={this.props.requestQuery} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => this.onChangeTwitterQuery(e)} />
                    </div>                    
                </div>
                <div className="form-group">
                    <input type="button" defaultValue="Execute Query" id="executeQueryButton" className="btn btn-primary" onClick={(e) => this.executeTwitterQuery(e)} />
                </div>
            </React.Fragment>
        );
    }

    private renderQueryOutput() {
        return (
            <div className="form-group">
                <label>Query Result: </label>
                <textarea className='form-control' rows={8} id="twitterQueryResult" defaultValue={this.props.queryResult} readOnly={true} />
            </div>
        );
    }

}

export default connect(
    (state: ApplicationState) => state.twitterQuery, // Selects which state properties are merged into the component's props
    TwitterQueryStore.actionCreators // Selects which action creators are merged into the component's props
)(TwitterQuery as any);
