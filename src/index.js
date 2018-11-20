import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const Page = () => {
    return (
      <div id="container">
        <h1>Minuteur</h1>
        <div id="content">
            <Minuteur ing={'patte'} min={0} sec={480}/> 
            <MinuteurNew />
        </div>
      </div>
    )
  }

  class MinuteurNew extends React.Component{
      constructor(){
            super();
            this.state = {
                items: [],
                term: '',
                sec:0
            }
      }
  handleChangeTerm = (e) => {
    this.setState({
        term: e.target.value
    })
  }
  handleChangeSec = (e) => {
    this.setState({
        sec: e.target.value
    })
  }
  handleSubmit = (e) =>{
    e.preventDefault()
    this.setState({
        items: [... this.state.items, {term : this.state.term, sec : this.state.sec}],
        term: this.state.term,
        sec: this.state.sec
    })
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
        <h2>Nouveau Minuteur</h2>
            <input placeholder="Nom du minuteur" name="term" value={this.state.term} onChange={this.handleChangeTerm}/>
            <input name="seconde" type="number" value={this.state.sec} onChange={this.handleChangeSec}/>
            <button>Ajouter</button>
        </form>
        <div class="content">
            {    
                this.state.items.map(function(name, index){
                    return <Minuteur ing={name.term} min={0} sec={name.sec} />;
                })      
            }
        </div>
      </div>
    );
  }
}
export default MinuteurNew;
  class Minuteur extends React.Component {
      constructor(props){
        super(props)
        this.state = {    	
        min : Math.round(this.props.sec / 60),
        sec : Math.round(this.props.sec % 60),
        ready: false,
        isToggleOn: false
      }
      this.handleClick = this.handleClick.bind(this);
    };
    start = () => {
        this.time = setInterval( () => this.timing(), 1000)
    }
    reset = () => {   
      this.setState({
        min : Math.round(this.props.sec / 60),
        sec : Math.round(this.props.sec % 60),
        ready: false,
        isToggleOn: false
      })
      this.endorstop(false)  
    //   this.componentDidMount()
    };
    handleClick = () => { 
      if(this.state.isToggleOn === true){
        this.endorstop(false)      
      }else{
          this.start();
      } 
      this.setState(
          state => ({
            isToggleOn: !state.isToggleOn
          }), 
        );
    };
    timing = () => {
        if(this.state.min !== 0 || this.state.sec !== 0){
          if(this.state.sec === 0){
            this.setState({
              sec : 59,
            min : this.state.min -1
          })
        } else {
            this.setState({
              sec : this.state.sec - 1          
          })
        }
      }  else {
        this.endorstop(true)
      }
    };
    endorstop = (ready_statut) => {
      clearInterval(this.time)
        this.setState({
          ready : ready_statut          
        })
    };
    createTimer = () => {

    };
    newTimer = (props) => { 
        
    };
    render = () => {
        let minute = this.state.min < 10 ? '0' + this.state.min : this.state.min, seconde = this.state.sec < 10 ? '0' + this.state.sec : this.state.sec;
      return (
          <div className={this.state.ready ? 'ingredient ready' :  'ingredient'}>
            <h2>
            { this.props.ing } {(this.props.min < 10 ? '0' + Math.round(this.props.sec / 60) : Math.round(this.props.sec / 60)) + ':' + (this.props.sec % 60 < 10 ? '0' + Math.round(this.props.sec % 60) : Math.round(this.props.sec % 60))}
            </h2>
            <div className="minuteur">
                { this.state.ready ? '00:00' : (minute + ':' + seconde)}
            </div>
            <button href="#" onClick={this.handleClick}>
                {this.state.isToggleOn ? 'Pause' : 'Start'}
            </button>
            <button href="#" onClick={this.reset}>
                Réinitialiser
            </button>              
          </div>
      )
    };
  }

  ReactDOM.render(<Page />, document.getElementById("root"))
  
