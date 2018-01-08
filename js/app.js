class Game extends React.Component {
  constructor(props) {
  super(props);
  this.turn = 2;
  this.step = this.step.bind(this);
  this.reset = this.reset.bind(this);
  this.state = {
      data: [
        {
          id: 0,
        },
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
        {
          id: 5,
        },
        {
          id: 6,
        },
        {
          id: 7,
        },
        {
          id: 8,
        },
      ]
    }
  this.initialState = JSON.parse(JSON.stringify(this.state))
  }

  render() {
    return (
      <div className="game">
        <Cells data={this.state.data} step={this.step}/>
        <div className="counts"><span>Крестиков: {this.count('x')}</span><span>Ноликов: {this.count('o')}</span></div>
        <button className="reset_btn" onClick={this.reset}>Сброс</button>
      </div>
    )
  }
  step(itemId) {
    let newState = Object.assign({}, this.state);
    let item = _.find(newState.data, {id: itemId});
    if(this.turn % 2 == 0) {
      if(!item.value) {
        item.value = 'x'
        this.turn++;
      }
    } else if(!item.value) {
      item.value = 'o';
      this.turn++;
    }
    this.checkWinner('x', 'Победили Крестики');
    this.checkWinner('o', 'Победили Нолики');
    this.checkTie();
    this.setState(newState);
  }
  fieldBlock() {
    // let state = this.state;
    // Object.defineProperty(state.data[4], 'value', {writable: false})
    let gameField = document.querySelector('.game__field');
    gameField.classList.add('field__block');
  }

  count(value) {
    let state = this.state;
    let counter = [];
    state.data.forEach(function(item) {
      if(item.value == value) {
        counter.push(item.value);
      }
    })
    return counter.length;
  }
  checkWinner(symbol, message) {
    let state = this.state;
    if(state.data[0].value == symbol && state.data[1].value == symbol && state.data[2].value == symbol) {
      this.fieldBlock();
    }
    if(state.data[3].value == symbol && state.data[4].value == symbol && state.data[5].value == symbol) {
      this.fieldBlock();
    }
    if(state.data[6].value == symbol && state.data[7].value == symbol && state.data[8].value == symbol) {
      this.fieldBlock();
    }
    if(state.data[0].value == symbol && state.data[3].value == symbol && state.data[6].value == symbol) {
      this.fieldBlock();
    }
    if(state.data[1].value == symbol && state.data[4].value == symbol && state.data[7].value == symbol) {
      this.fieldBlock();
    }
    if(state.data[2].value == symbol && state.data[5].value == symbol && state.data[8].value == symbol) {
      this.fieldBlock();
    }
    if(state.data[0].value == symbol && state.data[4].value == symbol && state.data[8].value == symbol) {
      this.fieldBlock();
    }
    if(state.data[2].value == symbol && state.data[4].value == symbol && state.data[6].value == symbol) {
      this.fieldBlock();
    }
  }

  checkTie() {
    let state = this.state;
    if(state.data.every(item => item.value)) {
      this.fieldBlock();
    }
  }

  reset() {
    let resetedState = JSON.parse(JSON.stringify(this.initialState));
    this.setState(resetedState);
    let gameField = document.querySelector('.game__field');
    gameField.classList.remove('field__block');
    this.turn = 2;
  }
}

class Cells extends React.Component {
  render () {
    let _this = this;
    let data = this.props.data;
    let basket = data.map(function(item) {
      return (
        <div key={item.id} onClick={_this.props.step.bind(null, item.id)} className="cell">{item.value}</div>
      );
    });
    return (
      <div className="game__field">{basket}</div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));
