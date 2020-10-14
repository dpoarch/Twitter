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
var TwitterQueryStore = require("../store/TwitterQuery");
var TwitterQuery = /** @class */ (function (_super) {
    __extends(TwitterQuery, _super);
    function TwitterQuery(props) {
        var _this = _super.call(this, props) || this;
        //const { requestQuery } = props;
        //const { queryResult } = props;
        _this.executeTwitterQuery.bind(_this);
        return _this;
    }
    // This method is called when the component is first added to the document
    TwitterQuery.prototype.componentDidMount = function () {
    };
    // This method is called when the route parameters change
    TwitterQuery.prototype.componentDidUpdate = function () {
        //this.ensureDataFetched();
    };
    TwitterQuery.prototype.render = function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("h1", { id: "tabelLabel" }, "Twitter Query"),
            React.createElement("p", null, "This will query on Twitter API"),
            this.renderQueryInput(),
            this.renderQueryOutput()));
    };
    TwitterQuery.prototype.executeTwitterQuery = function (e) {
        e.preventDefault();
        this.props.requestTwitterQuery(this.props.requestQuery);
    };
    TwitterQuery.prototype.onChangeTwitterQuery = function (e) {
        this.props.setTwitterQuery(e.target.value);
    };
    TwitterQuery.prototype.renderQueryInput = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement("p", null, "https://developer.twitter.com/en/docs/twitter-api/v1/rules-and-filtering/guides/build-standard-queries"),
            React.createElement("p", null, "https://developer.twitter.com/en/docs/twitter-api/v1/rules-and-filtering/guides/using-premium-operators"),
            React.createElement("div", { className: "rows" },
                React.createElement("div", { className: "form-group" },
                    React.createElement("label", null, "Enter Query: "),
                    React.createElement("textarea", { className: 'form-control', rows: 4, id: "twitterQueryInput", defaultValue: this.props.requestQuery, onChange: function (e) { return _this.onChangeTwitterQuery(e); } }))),
            React.createElement("div", { className: "form-group" },
                React.createElement("input", { type: "button", defaultValue: "Execute Query", id: "executeQueryButton", className: "btn btn-primary", onClick: function (e) { return _this.executeTwitterQuery(e); } }))));
    };
    TwitterQuery.prototype.renderQueryOutput = function () {
        return (React.createElement("div", { className: "form-group" },
            React.createElement("label", null, "Query Result: "),
            React.createElement("textarea", { className: 'form-control', rows: 8, id: "twitterQueryResult", defaultValue: this.props.queryResult, readOnly: true })));
    };
    return TwitterQuery;
}(React.PureComponent));
exports.default = react_redux_1.connect(function (state) { return state.twitterQuery; }, // Selects which state properties are merged into the component's props
TwitterQueryStore.actionCreators // Selects which action creators are merged into the component's props
)(TwitterQuery);
//# sourceMappingURL=TwitterQuery.js.map