import React from 'react';
import logo from './logo.svg';
import './App.css';


var App = React.createClass({

  //React lifecycle method  
  getInitialState: function() {
    return {
      username: '@Hungtt6'
    }
  },

  //User defined
  handleChange: function(e) {
    this.setState({
      username: e.target.value
    });
  },

  //React lifecycle method  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img
               src={ logo }
               className="App-logo"
               alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <HelloUser name={this.state.username}/>
          <br /> Change Name:
          <input
                 type="text"
                 value={ this.state.username }
                 onChange={ this.handleChange } />
        </div>

        <br/>

        <div>
          <FriendsContainer/>
        </div>
      </div>
      );
  }
});

// Example #1: Passing parent state to become children properties
var HelloUser = React.createClass({
  render: function() {
    return (
      <div>
        Hello, { this.props.name }
      </div>
    )
  }
});

// Example #2, Manipulate List using JS Forloop
var FriendsContainer = React.createClass({
  getInitialState: function(){
    return {      
      friends: ['Jake Lingwall', 'Murphy Randall', 'Merrick Christensen']
    }
  },
  addFriend: function(friend){
    this.setState({
      friends: this.state.friends.concat([friend])
    });
  },
  editFriend: function(name, id){
    this.state.friends[id] = name;
    this.setState(this.state);
  },
  render: function(){
    return (
      <div>
        
        <AddFriend addNew={this.addFriend}/>
        <ShowList names={this.state.friends} editFn={this.editFriend} />
      </div>
    )
  }
});

var ShowList = React.createClass({

  render: function(){
    var _this = this;
    var listItems = this.props.names.map(function(friend, id){
      return <FriendDetail name={friend} id={id} updateFriend={_this.props.editFn}/>;
    });
    return (
      <div>
        <h3> Friends </h3>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
});

var AddFriend = React.createClass({
  getInitialState: function () {
    return {
      newFriend: ''
    }
  },
  updateNewFriend: function (e) {
    this.setState({
      newFriend: e.target.value
    })
  },
  handleAddNew: function (e) {
    if (this.state.newFriend){
      this.props.addNew(this.state.newFriend);
      //reset after add
      this.setState({
        newFriend: ''
      })
    }
  },
  render: function () {
  return (
    <div>
      <input type="text" value={this.state.newFriend}
      onChange={this.updateNewFriend}/>
      <button onClick={this.handleAddNew}>Add Friend </button>
    </div>
    );
  }
})

var FriendDetail = React.createClass({
  getInitialState: function () {
    return {
      myName: this.props.name,
      isEditing: false,
    }
  },
  editMe: function () {
    this.setState({
      isEditing: true,
    })
  },
  updateMyName: function () {
    this.props.updateFriend(this.state.myName, this.props.id);
    this.setState({
      isEditing: false
    });
  },
  render: function () {
    return (
      <li>
        <div onClick={this.editMe}  style={{display: !this.state.isEditing ? 'block' : 'none' }} >
        {this.state.myName}
        </div>
      <div style={{display: this.state.isEditing ? 'block' : 'none' }}>
        <input type="text" value={this.state.myName} onChange={(e)=>{this.setState({myName: e.target.value})}} />
        <button onClick={this.updateMyName}> Save</button>

      </div>
      </li>
      )

  }
});

export default App;
