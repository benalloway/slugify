import React from 'react';
import slug from 'slug';

class Slugify extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        input: '',
        output: '',
        saved: []
      }


      this.setInput = this.setInput.bind(this)
      this.resetInput = this.resetInput.bind(this) // took me a min to remember to add this for the reset button to work.
      this.saveInput = this.saveInput.bind(this)
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


// Ben's Save Button
    saveInput() {
      this.setState({

        input: '',
        output: '',
        saved: this.state.saved.concat(this.state.output)
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
              RESET ALL
            </button>

            <button
              className="save"
              onClick={this.saveInput}
            >
            SAVE ME
            </button>

            <br />

            <div>{this.state.output}</div>

            <br />

            <div className="test">{this.state.saved}</div>
          </div>
        )
    }
}


export default Slugify;
