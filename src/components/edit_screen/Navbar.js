import React from 'react'
import { Modal } from 'react-materialize';

class Navbar extends React.Component {
  constructor() {
    super();

    console.log("Navbar constructed");
  }

  componentDidMount = () => {
      console.log("\tNavbar component did mount");
  }

  componentWillUnmount = () => {
      console.log("\tNavbar component will unmount");
  }

  handleGoHome = () => {
    console.log("handleGoHome");
    this.props.goToHomeCallback();
  }

  handleDeleteLogo = () => {
    console.log("handleDeleteLogo");
    this.props.deleteLogoCallback();
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <div  className='brand-logo' 
                style={ {cursor: "pointer"} }
                onClick={this.handleGoHome}>
            goLogoLo
          </div>
          <Modal trigger={<ul id="nav-mobile" className="right hide-on-med-and-down">
            <li style={ {cursor: "pointer"} }>&#128465;</li></ul>}>
            <div className="col s4">Please confirm you want to delete the current logo.:</div>
            <button onClick ={this.handleDeleteLogo}>Confirm</button>
          </Modal>
          
        </div>
      </nav>
    )
  };
}

export default Navbar;