import React from 'react';
import $ from 'jquery';

class TermsMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryCount: 1,
      categoryContentCount: {},
      inputs: {
      }
    };

    //bind functions to class
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.addContent = this.addContent.bind(this);
  }

  handleSubmit(e) {
    let submission = this.state.inputs;
    console.log(submission);
    $.ajax({
      type: "POST",
      url: '/termsMaker',
      contentType: 'application/json',
      data: JSON.stringify(submission)
    }).done(function(){
      window.location = window.location.pathname + '#/GearViewMaker';
      console.log('successful post from terms');
    }).fail(function(err){
      console.log(err);
    });
  }

  handleContentChange(e) {
    let categoryName = e.target.getAttribute('data-categoryname');
    let contentName = e.target.getAttribute('data-contentname');
    let inputs = this.state.inputs;
    let contentVal = e.target.value;
    inputs[categoryName][contentName] = contentVal;
    console.log(JSON.stringify(inputs));
    this.setState({inputs})
  }

  handleCategoryChange(e) {
    let categoryName = e.target.getAttribute('data-categoryname');
    let contentName = e.target.getAttribute('data-contentname');
    let inputs = this.state.inputs;
    let categoryTitle = e.target.value;
    inputs[categoryName] = inputs[categoryName] || {};
    inputs[categoryName].title = categoryTitle;
    console.log(inputs);
    this.setState({inputs})
  }

  addCategory () {
    var count = this.state.categoryCount + 1;
    this.setState({categoryCount: count});
  }

  addContent (categoryName) {
    var count = this.state.categoryContentCount[categoryName] || 1;
    count = count + 1;
    var obj = this.state.categoryContentCount;
    obj[categoryName] = count;
    this.setState({obj});
  }

  render() {
    return (
      <div className="rxContainer">
        <h1> Conditions </h1>
         <p> Let your team know what to expect. </p>
        <Categories 
          categoryCount = {this.state.categoryCount} 
          categoryContentCount={this.state.categoryContentCount}
          addContent={this.addContent}
          handleCategoryChange={this.handleCategoryChange}
          handleContentChange={this.handleContentChange}
          />
        <Buttons
          handleSubmit = {this.handleSubmit}
          addCategory = {this.addCategory}
        />
      </div>
    );
  }
}

// submit all content at the end
let Buttons = ({handleSubmit, addCategory}) => {
  return (
    <div>
      <button id="submit" onClick={handleSubmit}> Submit </button>
      <button id="addCategory" onClick={addCategory}> Add category </button>
    </div>
  )
}

let Categories = ({categoryCount, categoryContentCount, addContent, handleContentChange, handleCategoryChange}) => {

  let count = categoryCount;
  let children = [];

  for (let i = 0; i < count; i++) {
    let categoryName = `category${i}`; 

    children.push( <Category 
      key={i} 
      categoryName={categoryName} 
      categoryContentCount={categoryContentCount}
      addContent={addContent}
      handleCategoryChange={handleCategoryChange}
      handleContentChange={handleContentChange}
      />);
  }

    return (
      <div className="segment">
      {children}
      </div>
    )
    
}


let Category = ({handleContentChange,categoryName, categoryContentCount, handleCategoryChange, addContent}) => {
  let count = categoryContentCount[categoryName] || 1;
  let children = [];


  for (var i = 0; i < count; i++) {
    let contentName = `content${i}`;
    children.push(<Content 
      key={i} 
      handleContentChange = {handleContentChange} 
      categoryName = {categoryName}
      contentName = {contentName}
      />)
  }
      return (
        <div>
        <input 
          type="text" 
          placeholder="Category"
          data-categoryname= {categoryName}
          onChange={handleCategoryChange}
        />

        {children}
        <button id="addContent" onClick = {function () {addContent(categoryName)}}> Add content </button> 

      </div>
    )
}

let Content = ({categoryName, contentName, handleContentChange}) => {
  return (
    <div>
    <input 
      type="text" 
      placeholder="Content"
      data-categoryname= {categoryName}
      data-contentname= {contentName}
      onChange={handleContentChange} 
    />
    </div>
  )
}

export default TermsMaker