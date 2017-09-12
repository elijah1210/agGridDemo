import React, { Component } from 'react';

import 'url-search-params-polyfill';

// import DynamicComponentsExample from "./dynamicComponentExample/DynamicComponentsExample";
// import RichGridExample from "./richGridExample/RichGridExample";
// import RichComponentsExample from "./richComponentExample/RichComponentsExample";
// import EditorComponentsExample from "./editorComponentExample/EditorComponentsExample";
// import PinnedRowComponentExample from "./pinnedRowExample/PinnedRowComponentExample";
// import FullWidthComponentExample from "./fullWidthExample/FullWidthComponentExample";
// import GroupedRowInnerRendererComponentExample from "./groupedRowInnerRendererExample/GroupedRowInnerRendererComponentExample";
// import FilterComponentExample from "./filterComponentExample/FilterComponentExample";
// import MasterDetailExample from "./masterDetailExample/MasterDetailExample";
import SimpleReduxExample from './simpleReduxExample/SimpleReduxExample';
// import FloatingFilterGridExample from "./floatingFilter/FloatingFilterGridExample";
import SimpleReduxDynamicExample from './simpleReduxDynamicComponentExample/SimpleReduxExample';

class App extends Component {
	constructor(props) {
		super(props);

		const searchParams = new URLSearchParams(window.location.search);
		const fromDocs = searchParams.has('fromDocs');
		const example = searchParams.has('example') ? searchParams.get('example') : 'rich-grid';

		this.state = {
			example,
			fromDocs,
		};

		this.setExample = this.setExample.bind(this);
	}

	setExample(example) {
		this.setState({
			example,
		});
	}

	render() {
		let header = null;
		if (!this.state.fromDocs) {
			header = (
				<ul className="nav nav-pills">
					<li
						role="presentation"
						className={this.state.example === 'simple-redux' ? 'active' : null}
						onClick={() => this.setExample('simple-redux')}
					>
						<a href="#">Simple Redux Example</a>
					</li>
					<li
						role="presentation"
						className={this.state.example === 'simple-redux-dynamic' ? 'active' : null}
						onClick={() => this.setExample('simple-redux-dynamic')}
					>
						<a href="#">Simple Redux Dynamic Component Example</a>
					</li>
				</ul>);
		}

		let example = null;
		switch (this.state.example) {
			case 'simple-redux':
				example = <SimpleReduxExample />;
				break;
			case 'simple-redux-dynamic':
				example = <SimpleReduxDynamicExample />;
				break;
			default:
                // example = <RichGridExample/>;
		}

		return (
			<div>
				{header}
				{example}
			</div>
		);
	}
}

export default App;
