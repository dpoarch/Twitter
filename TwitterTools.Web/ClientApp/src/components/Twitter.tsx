import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as TwittersStore from '../store/Twitter';

// At runtime, Redux will merge together...
type TwitterProps =
    TwittersStore.TwitterState // ... state we've requested from the Redux store
    & typeof TwittersStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{}>; // ... plus incoming routing parameters


class Twitter extends React.PureComponent<TwitterProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {        
        //this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">Top Hash Tags</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {this.props.isLoading && <span>Loading...</span>}
                {this.renderTopHashTagsTable()}
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        this.props.requestTopHashTags();
    }

    private renderTopHashTagsTable() {
        let trends = this.props.topHashTags != undefined && this.props.topHashTags != null && this.props.topHashTags.length > 0 ? this.props.topHashTags[0].trends:[]
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Tweet volume</th>
                        <th>Name</th>
                        <th>Url</th>
                    </tr>
                </thead>
                <tbody>                    
                    {
                        trends.sort(function (a, b) {
                            return a.tweet_volume > b.tweet_volume ? -1 : (a.tweet_volume < b.tweet_volume ? 1 : 0);
                            })
                            .map((hashTag: TwittersStore.HashTag, index) =>
                            <tr key={index}>
                                <td>{hashTag.tweet_volume}</td>
                                <td>{hashTag.name}</td>
                                <td>{hashTag.url}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        );
    }

}

export default connect(
    (state: ApplicationState) => state.twitter, // Selects which state properties are merged into the component's props
    TwittersStore.actionCreators // Selects which action creators are merged into the component's props
)(Twitter as any);
