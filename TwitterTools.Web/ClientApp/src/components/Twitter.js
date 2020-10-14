"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var TwittersStore = require("../store/Twitter");
var Twitter = /** @class */ (function (_super) {
    __extends(Twitter, _super);
    function Twitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // This method is called when the component is first added to the document
    Twitter.prototype.componentDidMount = function () {
        this.ensureDataFetched();
    };
    // This method is called when the route parameters change
    Twitter.prototype.componentDidUpdate = function () {
        //this.ensureDataFetched();
    };
    Twitter.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", { id: "tabelLabel" }, "Top Hash Tags"),
            React.createElement("p", null, "This component demonstrates fetching data from the server."),
            this.props.isLoading && React.createElement("span", null, "Loading..."),
            this.renderTopHashTagsTable()));
    };
    Twitter.prototype.ensureDataFetched = function () {
        this.props.requestTopHashTags();
    };
    Twitter.prototype.renderTopHashTagsTable = function () {
        var trends = this.props.topHashTags != undefined && this.props.topHashTags != null && this.props.topHashTags.length > 0 ? this.props.topHashTags[0].trends : [];
        return (React.createElement("table", { className: 'table table-striped', "aria-labelledby": "tabelLabel" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "Tweet volume"),
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "Url"))),
            React.createElement("tbody", null, trends.sort(function (a, b) {
                return a.tweet_volume > b.tweet_volume ? -1 : (a.tweet_volume < b.tweet_volume ? 1 : 0);
            })
                .map(function (hashTag, index) {
                return React.createElement("tr", { key: index },
                    React.createElement("td", null, hashTag.tweet_volume),
                    React.createElement("td", null, hashTag.name),
                    React.createElement("td", null, hashTag.url));
            }))));
    };
    return Twitter;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.twitter; }, // Selects which state properties are merged into the component's props
TwittersStore.actionCreators // Selects which action creators are merged into the component's props
)(Twitter);
//# sourceMappingURL=Twitter.js.map