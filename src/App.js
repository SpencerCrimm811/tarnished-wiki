import React, { Component } from 'react';
import './App.css';
import Wrapper from './Wrapper'
import {DrawBoard} from './DrawBoard';
import {FightButton} from './DrawBoard';

class App extends Component {

  constructor() {
    super();
    this.state = {
      tarnishedList: [],
      chosenTarnished: {},
      isChosen: false,
      playerOne: 'Tarnished No.1',
      oneId: '',
      twoId: '',
      playerTwo: 'Tarnished No.2',
      winner: ''
    };
    
    this.refOne = React.createRef();
    this.refTwo = React.createRef();
    this.refThree = React.createRef();
    this.refFour = React.createRef()
  };

  onChange() {
    this.setState({ isChosen: true })
    if (this.refOne.current.value !== 'none') {
      let fakeTarnishedList = [...this.state.tarnishedList];
      let fakeTarnished = {...fakeTarnishedList[this.refOne.current.value - 1]};
      this.setState({ chosenTarnished: fakeTarnished })
    }
  };

  onClick1() {
    let theChosen = this.state.chosenTarnished.name;
    let chosenId = this.state.chosenTarnished.id;
    this.setState({ playerOne: theChosen });
    this.setState(previousState => ({
      oneId: String(Number(previousState.oneId) + Number(chosenId))
    }));
    console.log(this.state.oneId);
    console.log(chosenId)
  };

  onClick2() {
    let theChosen = this.state.chosenTarnished.name;
    let chosenId = this.state.chosenTarnished.id;
    this.setState({ playerTwo: theChosen });
    this.setState(previousState => ({
      twoId: String(Number(previousState.twoId) + Number(chosenId))
    }));
    console.log(this.state.twoId);
    console.log(chosenId)
  };

  onClick3() {
    var player1 = this.state.oneId;
    var player2 = this.state.twoId;
    var players = [player1, player2]
    var chosenPlayer = Math.floor(Math.random() * players.length)

    fetch(`http://174.129.1.155:3000/Fight${players[chosenPlayer]}`)
    .then(data => {
      return data.text()
    })
    .then(result => {
      this.setState({ winner: result});
      console.log(result)
    })
  };

  componentDidMount() {
    fetch(`http://174.129.1.155:3000/Tarnished`)
    .then(data => {
      return data.json()
    })
    .then(result => {
      this.setState({ tarnishedList: result });
      console.log(this.state.tarnishedList)
    })
  };

  /*componentDidMount() {
    fetch(`http://localhost:3000/Tarnished`)
    .then(data => {
      return data.json()
    })
    .then(result => {
      for (let i = 0; i < result.length; i++) {
        this.tarnishedList.push(result[i])
      }
    });
    console.log(this.tarnishedList)
  };*/

  

  render() {

    return(
        <div className="theparent">
          <h1 className="titlecard">Behold, The Tarnished of The Lands Between</h1>
          <label className="chooser" for="tarnished">Choose playing card! : </label>
          <select ref={this.refOne} onChange={this.onChange.bind(this)}>
              <option value="none">Choose Tarnished</option>
              {this.state.tarnishedList.map(tarnished => (
                <option value={tarnished.id}>
                  {tarnished.name}
                </option>
              ))}
          </select>
          <p></p>
          <button ref={this.refTwo} onClick={this.onClick1.bind(this)}>Submit Tarnished 1</button>
          <p></p>
          <button ref={this.refThree} onClick={this.onClick2.bind(this)}>Submit Tarnished 2</button>
          <CardDecider chosen={this.state.chosenTarnished} isTarnishedChosen={this.state.isChosen} />
          <FightDecider player1={this.state.playerOne} player2={this.state.playerTwo} reference={this.refFour} onClick={this.onClick3.bind(this)} />
              <h1 className="winner">{this.state.winner}</h1>
        </div>
    )
  };

};

function FightDecider(props) {
  var isPlayerOne = props.player1;
  var isPlayerTwo = props.player2;

  if (isPlayerOne !== 'Tarnished No.1' && isPlayerTwo !== 'Tarnished No.2') {
    return (
      <div>
        <DrawBoard player1={isPlayerOne} player2={isPlayerTwo} />
        <FightButton reference={props.reference} onClick={props.onClick} />
      </div>
    )
  } else {
    return <DrawBoard player1={isPlayerOne} player2={isPlayerTwo} />
  }
};

function PlayingCard(props) {
    return (
      <div className="outer">
        <div className="card">
          <img src={props.chosen.portrait} alt="chosenCard" className="theportrait"></img>
          <div className="container">
            <h3><b>{props.chosen.name}</b></h3>
            <h4>{props.chosen.title}</h4>
            <h4>{props.chosen.factionname}</h4>
            <p>{props.chosen.type}</p>
            <p>{props.chosen.description}</p>
          </div>
        </div>
      </div>
    )
};

function EmptyCard() {
  return <h2 className="warning">no Tarnished selected yet!</h2>
};

/*
function EmptyBoard() {
  return (
    <div className="drawboard">
      <h1>Tarnished No. 1{'\n'}</h1>
      <h1>{'\n'}</h1>
      <h1>versus{'\n'}</h1>
      <h1>{'\n'}</h1>
      <h1>Tarnished No. 2</h1>
    </div>
  )
};
*/

function CardDecider(props) {
  const isDecided = props.isTarnishedChosen;
  if (isDecided) {
    return <PlayingCard chosen={props.chosen}/>
  } else {
    return <EmptyCard />
  }
};

/*
function DrawBoardDecider(props) {
  const isDecided = props.isTarnishedChosen;
  if (isDecided){
    return <DrawBoard player1={props.chosen} player2={props.chosen}/>
  } else {
    return <EmptyBoard />
  }
};
*/

export default App