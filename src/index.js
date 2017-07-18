import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

function ComposeMessage(props){
  return (
    <div>
      <input type='text'
        value={props.value} 
        id='compose-message' 
        placeholder='Send your message to the group' 
        onChange={(e) => props.handleChange(e, {type: 'message'})}  
        onKeyDown={(e) => props.handleKeyPress(e, {type: 'message'})} />
      <button type='submit' onClick={() => props.handleSubmit({type: 'message'})}>Send</button>
    </div>
  );
}

function StampedMessages(props){
  const messages = props.content.map((elem, index) => {
    return (
      <div key={index} className='message'>
        <div className='message-time'>
          <span>{elem.timestamp}</span>
        </div>
        <div className='message-content'>
          <span className='username'>{elem.user}</span><span>{elem.content}</span>
        </div>
      </div>
    );
  });
  return (
    <div>{messages}</div>
  );
}

function MessageFeed(props){
  return(
     <div id='message-feed'>
      <StampedMessages content={props.content} /> 
    </div>
  );
}

function SignUp(props){
  return(
    <div>
      <span>Enter username: </span>
      <input type='text' placeholder='username' 
        onChange={(e) => props.handleChange(e, {type: 'user'})} 
        onKeyDown={(e) => props.handleKeyPress(e, {type: 'user'})} /> 
      <button type='submit' onClick={() => props.handleSubmit({type: 'user'})}>Enter</button>
    </div>
  );
}

class MessageApp extends React.Component{
  constructor(){
    super();
    this.state = {
      storedUser: false,
      feed:[],
      message: '',
      user: ''
    };
  }
  handleKeyPress(board, input) {
    if(board.key === 'Enter') {
      this.handleSubmit(input);
    }
  }
  handleSubmit(input) {
    const isMessage = input.type === 'message';
    const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}).toLowerCase();
    const content = isMessage ? this.state.message : this.state.user;
    const feed = this.state.feed.slice();
    
    if (content && isMessage) {
      feed.push({user:this.state.user, content: content, timestamp: timestamp});
      this.setState({feed: feed, message: ''});
    }

    if(content && input.type === 'user') {
      this.setState({storedUser: true})
    }

  }

  handleChange(e, input) {
    const value = e.target.value;
    if (input.type === 'message') {
      this.setState({message: value});

    } else if (input.type === 'user') {
      this.setState({user: value});

    }
  }
  renderChannel() {
    return (
      <div>
        <MessageFeed content={this.state.feed} /> 
        <ComposeMessage 
            value={this.state.message}
            handleKeyPress={this.handleKeyPress.bind(this)} 
            handleSubmit={this.handleSubmit.bind(this)} 
            handleChange={this.handleChange.bind(this)} /> 
      </div>
    );
  }

  renderSignUp() {
    return(
      <SignUp 
        handleKeyPress={this.handleKeyPress.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)} 
        handleChange={this.handleChange.bind(this)} />
    );
  }

  render() {
    const displayPage = this.state.storedUser ? this.renderChannel() : this.renderSignUp();
    return (
      <div>
        {displayPage}
      </div>
    );
    
  }
    
}


//********** Renders the messageApp to the browser **********//
ReactDOM.render(<MessageApp />, document.getElementById('root'));








