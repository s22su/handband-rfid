import React from 'react'

export default React.createClass({

  render() {
    if(this.props.children !== null) {
      return (
        <div>
            {this.props.children}
        </div>
      )
    }
    else {
      return (
        <div>
          <b>Hello!</b>
          <br/>
        </div>
      )
    }
  }
})
