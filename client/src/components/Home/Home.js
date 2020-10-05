import React from 'react';
import IconSelector from './IconSelector';
import SearchBar from './SearchBar';
import './../../css/Home.css';

//GET RID OF ALL STATE AND PROPS HERE

const BasicInstructions = props => {
  return (
    <div className="basic-instructions">
      Find reduced cost or free services in Multnomah, Washington and Clackamas
      counties.
    </div>
  );
};

const Home = props => {

    const { searchData, nodeData } = this.state;
    
    return (
    <section>
      <div className="home-outer-container">
        <div className="home-container">
          <div className="basic-search-container">
            <BasicInstructions />
            <SearchBar
              //"Search for a Service..."
              nodeData={nodeData}
              searchData={searchData}
            />
          </div>
          <IconSelector
            nodeData={props.nodeData}
            searchData={searchData}
            path={'/results'}
            isVisible={true}
          />
        </div>
      </div>
    </section>
    );
  }


const mapStateToProps = state => {
  return {
    nodeData: nodeData, 
    searchData: searchData,
  }
}

export default connect(mapStateToProps, { nodeData, 
  searchData })(Home);
