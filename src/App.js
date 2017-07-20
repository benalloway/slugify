import React from 'react';
import slug from 'slug';
import './App.css';

class Slugify extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        input: '',
        output: '',
        saved: [] // saved is an array, to store all the saved events
      }


      this.setInput = this.setInput.bind(this)
      this.resetInput = this.resetInput.bind(this)
      this.saveInput = this.saveInput.bind(this)
    }



    setInput(event) {
      this.setState({

        input: event.target.value,
        output: slug(event.target.value, {lower: true})
      }) 
    }

// Ben's RESET BUTTON
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
        saved: this.state.saved.concat(this.state.output) // had to use concat, because push just shows length of array instead of showing contents
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

            <div>{this.state.saved.map((savedSlug) => (
              <div className="saved-slug">{savedSlug}</div>
              ))}</div>
          </div>
        )
    }
}


export default Slugify;
