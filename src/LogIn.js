 import React from 'react'

class LogIn extends React.Component {

    state = {
      logIn: false,
      username: "",
      password: "",
      errors: []
    }
  
    onChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  
    logInSubmitted = (event) => {
      event.preventDefault()
      // make a fetch
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username, 
          password: this.state.password
        })
      }).then(res => res.json())
      .then(data => {
        if (data.errors) {
          this.setState({
            errors: data.errors
          })
        } else {
          this.props.gotToken(data.token, data.user_id)
        }
      })
      // when fetch is done...get token
    }
  
    render(){
      return <>
        <ul>
          {
            this.state.errors.map(error => <li>{ error }</li>)
          }
        </ul>
        {
          this.state.logIn 
          ? 
          <section>
            <h2>Log In</h2>
            <button onClick={ () => this.setState({ logIn: false }) }>I need to register!!!</button>
            <form onSubmit={ this.logInSubmitted }>
              <label  htmlFor="log_in_username">Username</label>
              <input  id="log_in_username" 
                      type="text" 
                      onChange={ this.onChange /* for controlled form input status */ } 
                      name="username" 
                      value={ this.state.username /* for controlled form input status */ } />
              <label  htmlFor="log_in_password">Password</label>
              <input  id="log_in_password" 
                      type="password" 
                      onChange={ this.onChange } 
                      name="password" 
                      value={ this.state.password } />
              <input type="submit" />
            </form>
          </section>
          :
          <section>
            <h2>Sign up</h2>
            <button onClick={ () => this.setState({ logIn: true }) }>I already signed up!!!</button>
            <form>
              <label  htmlFor="sign_up_username">Username</label>
              <input  id="sign_up_username" 
                      type="text" 
                      onChange={ this.onChange } 
                      name="username" 
                      value={ this.state.username } />
              <label  htmlFor="sign_up_password">Password</label>
              <input  id="sign_up_password" 
                      type="password" 
                      onChange={ this.onChange } 
                      name="password" 
                      value={ this.state.password } />
              <input type="submit" />
            </form>
          </section>
        }
      </>
    }
  
  }
  
  export default LogIn
