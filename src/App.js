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
      this.resetInput = this.resetInput.bind(this) // took me a min to remember to add this for the reset button to work.
    }



    setInput(event) {
      this.setState({

        input: event.target.value,
        output: slug(event.target.value, {lower: true})
      }) 
    }

// Ben's RESET BUTTON - after reading REACT's docs for an hour i figured out how to use setState to do this.
    resetInput() {
      this.setState({

        input: '',
        output: ''
      })
    }

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
