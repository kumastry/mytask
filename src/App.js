
import {useState, useEffect} from "react";
import React from 'react';


function Cards(props){
   
    return (
    <div>
    <div className="is-vertical-center">       
    {props.tasks.map( (tasks, idx) => {
    return  ( 
   
    <div class="card">
    <div class="card-content">
    <p class="title" id="edit">
    {tasks.title}           
    </p>
    </div>

    <footer class="card-footer">
        <input  type = "button" value = "edit" className="card-footer-item" onClick ={() => props.editTask(idx)}/>  
        <input  type = "button" value = "delete" className="card-footer-item" onClick={() => props.deleteTask(idx)} />
    </footer>

    </div>
    

    );
    })}
    </div>
    </div>        
    );
    
}

class EditForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        input: "",
        editing: true,
      }
      this.handleEditing = this.handleEditing.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
    render() {
      const { editing } = this.state
      return (
        <div>
          <h1>EditForm</h1>
          <form>
            {editing ? (
              <div>
                <input
                  onChange={(e) => {
                    this.setState({ input: e.target.value })
                  }}
                  type="text"
                  value={this.state.input}
                />
  
                <button onClick={this.handleSubmit}>Save</button>
              </div>
            ) : (
              <div>
                <span>{this.state.input}</span>
                <button onClick={this.handleEditing}>Edit</button>
              </div>
            )}
          </form>
        </div>
      )
    }
  
    handleEditing(e) {
      e.preventDefault()
      this.setState({
        editing: !this.state.editing,
      })
    }
  
    handleSubmit(e) {
      e.preventDefault()
      if (!this.state.input) return
      this.setState({
        input: this.state.input,
        editing: !this.state.editing,
      })
    }
  }
  

class TaskForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            value : '',
            tasks: []
        };
        this.addTask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    editTask(key) {
        const edit = {title:this.state.value};
        this.state.tasks.splice(key, 1, edit);
        this.setState({
            tasks:this.state.tasks
        });
        this.state.value='';
    }

    deleteTask(key) {
        this.state.tasks.splice(key, 1);
        this.setState({
            tasks : this.state.tasks
        });

        
    }

    addTask(event) {
        if(this.state.value != '') {
            this.state.tasks.unshift({
                title: this.state.value
            });

            this.setState({
                tasks : this.state.tasks
            });

            this.state.value= '';
        } else {
            alert("!?");
        }
    }




    // 初回のみ実行
 componentDidMount() {
    if(localStorage.app){ // もし前回のデータがあったら、ローカルストレージの値を取得し、更新する
      const saveDate = JSON.parse(localStorage.app);
      this.setState({
        tasks : saveDate.tasks
      })
    }
  }

  // stateが変更されたら実行
  componentDidUpdate() {
    // ローカルストレージにステートの情報を保存
    localStorage.setItem('app', JSON.stringify(this.state));
  }
    
  
    render() {
      return (
     <div>
        <section className="section">
            <div className="field">
                <div className="control">
                    <input className="input" type="text" placeholder="Text task" value ={this.state.value} onChange={this.handleChange} />
                </div>
            </div>

            <div>
                <button className="button is-fullwidth is-success is-light" onClick={this.addTask}>Add Task</button>
            </div>

            <Cards tasks={this.state.tasks} deleteTask={this.deleteTask} editTask={this.editTask}/>
        </section>
      </div>  
      );

      
    }
  }



function Header() {
    return (
        <header className = "hero is-info">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1">TASK LIST</h1>
          </div>
        </div>
        </header>
    );
}

function Footer() {
    return(
    <footer className="footer">
        <div className="content has-text-centered">
            <hr></hr>
                <p>&copy; kumastry</p>
                <p><a href = "kumastry2212@gmail.com">e-mail</a></p>
                <p><a href = "https://twitter.com/kumastry1">twitter</a></p>
        </div>
    </footer>
    );
}


function App() {
    return (
    <>
    <Header />
    <TaskForm />
    <Footer />
    
    </>

 
    
    );
}

export default App;