import React from 'react';
import $ from 'jquery';

class GearMaker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryCount: 1,
      categoryContentCount: {},
      inputs: {
        /*category0 : { 
          title: abcde
          content0: val
          content1: val
          }
        */
      }
    };

    //bind functions to class
    this.loginStatus = this.props.loginStatus
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.addContent = this.addContent.bind(this);
  }

  handleSubmit(e) {
    let submission = this.state.inputs;
    console.log(submission);
    let context = this;
    $.ajax({
      type: "POST",
      url: '/gearViewMaker',
      contentType: 'application/json',
      data: JSON.stringify(submission)
    }).done(function() {
      context.props.loginStatus('user');
      window.location = window.location.pathname + '#/TripDetailsUser';
      console.log('successful post from gear');
    }).fail(function(err) {
      console.log(err);
    });
  }

  handleContentChange(e) {
    console.log(e.target.checked);
    let categoryName = e.target.getAttribute('data-categoryname');
    let contentName = e.target.getAttribute('data-contentname');
    let description = e.target.getAttribute('data-description');
    let required = e.target.getAttribute('data-required');
    let inputs = this.state.inputs;
    let contentVal = e.target.value;
    if ( description ) {
      inputs[categoryName][description] = contentVal;
    } else if (required) {
      inputs[categoryName][required] = e.target.checked;
    } else {
      inputs[categoryName][contentName] = contentVal;
    }
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
        <h1> Gear List </h1>
        <p> Let your team know what to bring. Add categories and related content </p>
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
      <div>
        <button id="addCategory" onClick={addCategory}> Add new category </button>
      </div>
      <div>
        <button id="submit" onClick={handleSubmit}> Save this list </button>
      </div>
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
      <div>
      {children}
      </div>
    )
    
}


let Category = ({handleContentChange,categoryName, categoryContentCount, handleCategoryChange, addContent}) => {
  let count = categoryContentCount[categoryName] || 1;
  let children = [];


  for (var i = 0; i < count; i++) {
    let contentName = `content${i}`;
    let description = `description${i}`;
    let required = `required${i}`;

    children.push(<Content 
      key={i} 
      handleContentChange = {handleContentChange} 
      categoryName = {categoryName}
      contentName = {contentName}
      description = {description}
      required = {required}
      />)
  }
      return (
        <div>
        <h2> Category </h2>
        <input 
          type="text" 
          placeholder="Category (E.g. Clothes, Kitchen, Sleeping)"
          data-categoryname= {categoryName}
          onChange={handleCategoryChange}
        />
        
        {children}
        <button id="addContent" onClick = {function () {addContent(categoryName)}}> Add content </button> 

        </div>
    )
}

let Content = ({categoryName, contentName, description, handleContentChange, required}) => {
  return (
    <div>
      <input 
        type="text" 
        placeholder="Item"
        data-categoryname= {categoryName}
        data-contentname= {contentName}
        onChange={handleContentChange} 
      />
      <input 
        type="text" 
        placeholder="Description"
        data-categoryname= {categoryName}
        data-description= {description}
        onChange={handleContentChange} 
      />  
    <div>
      <p> Mandatory? </p>
      <input 
        type="checkbox" 
        data-categoryname= {categoryName}
        data-required= {required}
        onChange={handleContentChange} 
      />
      </div>
    </div>
  )
}

export default GearMaker