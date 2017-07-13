import React from 'react';
import slug from 'slug';

class Slugify extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        input: '',
        output: ''
      }


      this.setInput = this.setInput.bind(this)
    }

    setInput(event) {
      this.setState({

        input: event.target.value,
        output: slug(event.target.value, {lower: true})
      }) 
    }

// Ben's RESET BUTTON
    // resetInput(event) {
    //   this.setState({

    //     input: '',
    //     output: ''
    //   })
    // }

    render() {
      return(
          <div>
            <input 
              onChange={this.setInput}
              value={this.state.input}
            />

            <br />

            <button
              className="reset"
              onClick={this.resetInput}
            > 
              RESET ME
            </button>

            <br />

            <div>{this.state.output}</div>
          </div>
        )
    }
}


export default Slugify;
