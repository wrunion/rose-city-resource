import React from "react";
import Loading from "./static_components/Loading";
import Home from "./Home/Home";
import About from "./static_components/About";
import SuggestEdit from "./static_components/SuggestEdit";
import Results from "./Results/Results";
import Details from "./Details";
import Nav from "./Nav";
import Footer from "./static_components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  getNodeData,
  getPackageData,
  getCategorySearchData,
  getMainSearchData,
  dateString,
} from "../utils/api";
import "../icons/iconsInit";

/* REDUX REFACTOR 10.4.20 */ 
import { connect } from 'react-redux';
import nodeData, { SET_NODE_DATA } from './../store/actions/nodeData';
import searchData, { SET_SEARCH_DATA } from './../store/actions/searchData';

class App extends React.Component {
  state = {
    navDrawerVisible: false,
    savedDataId: [],
  };

  handleCardSave = (id) => {
    const { savedDataId } = this.state;
    if (savedDataId.indexOf(id) === -1) {
      this.setState((prevState) => ({
        savedDataId: [...prevState.savedDataId, id],
      }));
    } else {
      const filterArr = savedDataId.filter((item) => item !== id);
      this.setState(() => ({ savedDataId: filterArr }));
    }
  };

  handleSaveDelete = () => {
    this.setState(() => ({ savedDataId: [] }));
  };

  filterData = (nodeData) => {
    const generalCategories = getCategorySearchData(
      nodeData,
      "general_category"
    );
    const parentCategories = getCategorySearchData(
      nodeData,
      "parent_organization"
    );
    const mainCategories = getMainSearchData(nodeData);

    return {
      general: generalCategories,
      main: mainCategories,
      parent: parentCategories,
    };
  };

  handleDrawer = () =>
    this.setState((prev) => ({
      navDrawerVisible: !prev.navDrawerVisible,
    }));

  componentDidMount = async () => {
    const packageData = await getPackageData();
    this.revisionDate = dateString(
      packageData.result.metadata_modified
    );

    /* GET NODEDATA FROM THE BACKEND, AND PASS TO THE STORE */
    /* explanation: this calls a redux action, which then passes the data ("payload") to the central Redux store */
    const nodeData = await getNodeData();
    this.props.nodeData({type: SET_NODE_DATA, payload: nodeData });
    
    /* GET SEARCHDATA FROM THE BACKEND, AND PASS TO THE STORE */
    /* same process as above */
    const searchData = this.filterData(nodeData);
    this.props.searchData({type: SET_SEARCH_DATA, payload: searchData });

    /* THIS WILL BE REPLACED IN A HOT SECOND */
    this.setState(() => ({ nodeData, searchData }));
  };

  render() {
    console.log(this.state.nodeData);
    console.log(this.state.searchData);
    const { nodeData, searchData, savedDataId } = this.state;
    return (
      <React.Fragment>
        {!nodeData ? (
          <Loading />
        ) : (
          <Router>
            <div>
              <div className="main-content">
                <Nav />
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={(props) => (
                      <Home
                        {...props}
                        nodeData={nodeData}
                        searchData={searchData}
                      />
                    )}
                  />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/suggest-edit" component={SuggestEdit} />
                  <Route
                    path="/results"
                    component={(props) => (
                      <Results
                        {...props}
                        nodeData={nodeData}
                        searchData={searchData}
                        handleCardSave={this.handleCardSave}
                        handleSaveDelete={this.handleSaveDelete}
                        savedDataId={savedDataId}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/details"
                    component={(props) => (
                      <Details
                        {...props}
                        nodeData={nodeData}
                        handleCardSave={this.handleCardSave}
                        savedDataId={savedDataId}
                      />
                    )}
                  />

                  {/* for all other routes */}
                  <Route render={() => <p>Not Found</p>} />
                </Switch>
              </div>
              <Footer revisionDate={this.revisionDate} />
            </div>
          </Router>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { 
    searchData: searchData, 
    nodeData: nodeData, 
  }
}

export default connect(mapStateToProps, { searchData, nodeData })(App);
