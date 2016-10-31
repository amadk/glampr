import React from 'react';
import $ from 'jquery';

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      checkList: {}
    }
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShoppingListItems = this.handleShoppingListItems.bind(this);
  }

  handleSubmit() {
    $.ajax({
      type: "POST",
      url: '/shoppingList',
      data: JSON.stringify(checkList),
      contentType: 'application/json'
    }).done(function(data){
      window.location = window.location.pathname + '#/TripDetailsUser';

      console.log('submit checklist')
    }).fail(function(){
      console.log('failed to post checklist');
    });
  }

  handleCheckbox(e) {
    let item = e.target.id;
    let currList = this.state.checkList;
    currList.push(item);
    this.setState({checkList: currList})
  }

  handleShoppingListItems(data) {
    console('handle initiated');
    var items = {}
    data.forEach(function(item){
      items[item.category] = items[item.category] || [];
      items[item.category].push({
        id: item.id,
        name: item.name,
        description: item.description,
        sizing: item.sizing,
        quantity: item.quantity,
        required: item.required
      });
    });
    console.log(items)
    this.setState({items: items})
  }

  componentDidMount() {
    let context = this;
    $.ajax({
      type: "GET",
      url: '/shoppingList',
    }).done(function(data) {
      console.log(data);
      context.handleShoppingListItems(data);
      console.log(context.handleShoppingListItems);
      console.log('successful get from shopping list');
    }).fail(function(){
      console.log('failed to get from shopping list');
    });
  }

  handleSubmit(e) {
    var checkList = this.state.checkList;
    console.log(checkList, 'checkList from submit');
    $.ajax({
      type: "POST",
      url: '/shoppingList',
      data: JSON.stringify(checkList),
      contentType: 'application/json'
    }).done(function(data){
      window.location = window.location.pathname + '#/TripDetailsUser';
      console.log('submit checklist')
    }).fail(function(){
      console.log('failed to post checklist');
    });
  }

  handleCheckbox(e) {
    let item = e.target.id;
    let currList = this.state.checkList;
    console.log(currList);
    if (currList[e.target.id]) {
      currList[e.target.id] = false;
    }
    currList[e.target.id] = !currList[e.target.id];
    this.setState({checkList: currList})
  }

  handleShoppingListItems(data) {
    var items = {}
    data.forEach(function(item){
      items[item.category] = items[item.category] || [];
      items[item.category].push({
        id: item.id,
        name: item.name,
        description: item.description,
        sizing: item.sizing,
        quantity: item.quantity,
        required: item.required
      });
    });
    this.setState({items: items})
  }

  render() {
    return (
      <div>
        <div>
          <p>Here are the items you have to get for your trip. 
          As you acquire them, check it off here</p>
        </div>
        {Object.keys(this.state.items).map((category, i) => {
          return ( 
          <Category 
          key={i}
          title={category}
          items={this.state.items}
          handleCheckbox={this.handleCheckbox}
          />
        )})}
        <button onClick={this.handleSubmit}> Update your list </button>
      </div>
    );
  }
}

// submit all content at the end

let Category = (props) => {
  let items  = props[items][category]
    return (
      <div>
      <h2>{props.title}</h2>
      {props.items.map((item, i) => {
        return (
          <Item key={i} attributes={item} handleCheckbox={props.handleCheckbox}/>
        )
      })}
      </div>
    )
}

let Item = (props) => {
  
    return (
      <div>
        <div> 
          <input 
            id={props.attributes.id}
            type="checkbox" 
            onChange={props.handleCheckbox}
          />
          <div> <b> {props.attributes.name} </b></div>
        </div>
        <div> {props.attributes.description} </div>
        <div> {props.attributes.sizing} </div>
        <div> {props.attributes.quantity} </div>
        <div> {props.attributes.required} </div>
      </div>
    )
}

export default ShoppingList;