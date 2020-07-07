import React from 'react';
import data from './resource/database';
import './App.css';

 class App extends React.Component{
 	constructor(props){
 		super(props);
 		this.state = {
 			que_no : 0,
 			total : data.length,
 			score : 0,
 			selected: 0,
 			show:0,
 			count:180
 		}
 		this.showQue = this.showQue.bind(this);
 		this.chosen = this.chosen.bind(this);
 		this.nextQue = this.nextQue.bind(this);
 	}
 	reload = () =>{
 		this.setState({
 			score:0,
 			show:0,
 			selected:0,
 			count:180
 		})
 		this.showQue(0);
 	}
 	showQue = (q_no) =>{
 		clearInterval(this.myInterval);
 	 	 this.setState({
 			question: data[q_no].question,
 			options : data[q_no].answers,
 			correct : data[q_no].correct,
 			que_no : q_no+1
 		});
 		this.myInterval = setInterval(() =>{
	      this.setState(prevState => ({
	        count:this.state.count-1
	      }))
	    },1000)
  	}

 	nextQue = () =>{
 		let {selected,correct,score,que_no,total} = this.state;
 		if(selected===correct){
	 		this.setState({
	 			score: score+1	
	 		})
 		}
 		if(que_no===total){
 			this.setState({
 				show:2,
 			});
 		}
 		else{
 			this.setState({selected:0,count:180});
 			this.showQue(que_no);
 		}
 	}

 	chosen = (id) => {
 		this.setState({
 			selected:id
 		});
 	}

 	Start= () =>{
 		this.setState({
 			show : 1
 		})
 		this.showQue(0);
 	}

 	render() {
 		let {que_no,total,score,question,options,count,selected,show} = this.state
 		if(!count){
	 			if(show==2){
	 				clearInterval(this.myInterval);
	 		}
	 		else
 				this.nextQue();
 		}
  		return (
 			<div className="container">
 				{show===0 && 
 					<div className="s0">
 							<h1> React Quiz </h1>
 							<ul>
 								<li>A sample quiz on react.</li>
  								<li> total 15 que will be here.</li>
 								<li> maximum of 3 minutes is allowed for each question.</li>
 							</ul>
 		 					<button className="btn btn-primary btn-lg" onClick = {this.Start}>
		 						Start Quiz
		 					</button>
		 			</div>
 				}
 				{
 					show===1 &&
 					<div className="row">
 					<div className="col-lg-12 col-md-10">
	 					<div className="que">
		 					<h4 className=""> Question {que_no}/{total}</h4> <span className="timer"> Time left : {count} seconds </span>
		 					<p> {question} </p>
		 				</div>

		 				<div className="answer">
		 					<ul>
		 						<li onClick={() => this.chosen(1)} className={(selected===1)?'chosen':""}>
		 							<span>A</span>
		 							<p>{options[0]}</p>
		 						</li>
		 						<li onClick={() => this.chosen(2)} className={(selected===2)?'chosen':""}>
		 							<span>B</span>
		 							<p>{options[1]}</p>
		 						</li>  
		 						<li onClick={() => this.chosen(3)} className={(selected===3)?'chosen':""}>
		 							<span>C</span>
		 							<p>{options[2]}</p>
		 						</li>  
		 						<li onClick={() => this.chosen(4)} className={(selected===4)?'chosen':""}>
		 							<span>D</span>
		 							<p>{options[3]}</p>
		 						</li>  
		 					</ul>  
		 				</div>

		 				<div className="submit">
		 					<button className="btn btn-primary btn-lg" onClick = {this.nextQue}>
		 						{(que_no===total)?'Submit Quiz': "Next Question"}
		 					</button>
		 				</div>
 					</div>
 				</div>
 				}
 				{
 					show===2 && 
 					<div className="que">
		 				<p> You have completed the quiz. <br /> You got: <strong> {score} </strong> out of <strong> {total} </strong> questions right.</p>
		 				<button className="btn btn-primary btn-lg" onClick = {this.reload}>
		 						Restart
		 				</button>
 					</div>
 				}
 			</div>
 		)
 	}
 }

 export default App;