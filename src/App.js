import React from 'react';
import slug from 'slug';
import * as RBS from 'react-bootstrap';
import './App.css';
import HotKey from 'react-shortcut';
import IconSlug from './IconSlug';

class Slugify extends React.Component {
    constructor(props) {
      super(props)

      slug.charmap['$'] = '';

      this.state = {
        input: '',
        output: '',
        saved: [], // saved is an array, to store all the saved events
        alertMessage: '',
        isAlertOpen: false
      }

      this.input = null;
      this.setInput = this.setInput.bind(this)
      this.resetInput = this.resetInput.bind(this)
      this.saveInput = this.saveInput.bind(this)
      this.resetSlugs = this.resetSlugs.bind(this)
      this.copyCurrent = this.copyCurrent.bind(this)
      this.onCopySuccess = this.onCopySuccess.bind(this)
      this.giveInputFocus = this.giveInputFocus.bind(this)
    }

// saves slugs to local memory onclick save button
    componentDidUpdate(prevProps, prevState) {

      if(this.state.saved.length > prevState.saved.length){
         try {
          window.localStorage.setItem("savedSlugs", JSON.stringify(this.state.saved));
        } catch(err) {
          console.error(err);
        }
      }

    }

// this pulls saved slugs from locale memory if ther are ones
    componentDidMount() {

      if(window.localStorage.getItem("savedSlugs")){
        this.setState({
          saved: JSON.parse(window.localStorage.getItem("savedSlugs"))
        });
      }

      this.giveInputFocus();

    }

    giveInputFocus() {
      if (this.input) {
        this.input.focus();
      }
    }

// Show output through slug while input is being typed
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

      this.giveInputFocus();
    }


// Ben's Save Button
    saveInput() {

      this.setState({

        input: '',
        output: '',
        saved: this.state.saved.concat(this.state.output) // had to use concat, because push just shows length of array instead of showing contents
      });

      this.giveInputFocus();

    }

    // Ben's Reset All Button

    /*eslint no-restricted-globals: 0*/
    resetSlugs() {
      let shouldClear = confirm("Are you sure you want to delete your pet slugs?");

      if (shouldClear && process.env.NODE_ENV === "development") {
        // we're in dev, so base the clearing off the result of the confirm dialog
        shouldClear = confirm("Are you SUUUUUUUUUUUREEEEEE??");
      }

      if (shouldClear) {
        window.localStorage.clear();
        this.setState({saved: []});
      }

      this.giveInputFocus();
    }

    // HOT COPY FUNCTION

    copyCurrent() {
      var range = document.createRange();
          range.selectNodeContents(this.copyTextarea);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);

      try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'COPIED TO CLIPBOARD!' : 'SORRY, SOMETHING WENT WRONG...';
          this.onCopySuccess(msg);
        } catch (err) {
          console.error(err);
        }
    }

    // HOT COPY SUCCESS MESSAGE
    onCopySuccess(msg) {
      this.setState({
        alertMessage: msg,
        isAlertOpen: true
      });
      setTimeout(() => {
        this.setState({
          alertMessage: msg,
          isAlertOpen: false
        });
      }, 2000);
    }



    render() {
      return(
          <RBS.Grid className="text-center">
            <RBS.Row>
              <RBS.Col md={6} mdOffset={3}>


                {/* SAVED TO CLIPBOARD NOTIFICATION - ONLY APPEARS WHEN cmd+C or CTRL+C are pressed */}
                {this.state.isAlertOpen && <div>{this.state.alertMessage}</div>}

                {/* LOGO  */}
                <RBS.Col xs={12}>

                  <IconSlug width="50%" />

                </RBS.Col>


               {/* INPUT TEXT-BAR */}
                <RBS.Col xs={12}>

                  <RBS.FormGroup>

                    <RBS.InputGroup>

                      <RBS.InputGroup.Addon>
                        <IconSlug width="16px" />
                      </RBS.InputGroup.Addon>
                      <RBS.FormControl
                        value={this.state.input}
                        placeholder="SLUGIFY ME, BABY!"
                        onChange={this.setInput}
                        inputRef={ref => this.input = ref}
                        bsSize="large"
                      />

                    </RBS.InputGroup>

                  </RBS.FormGroup>

                </RBS.Col>

              {/* CLEAR AND SAVE BUTTON*/}

                 <RBS.Clearfix/>
                  <RBS.Col xs={6} id="button-column">

                    <RBS.Button
                      block
                      id="button"
                      className="reset"
                      onClick={this.resetInput}
                      bsStyle="danger"
                    >
                      CLEAR
                    </RBS.Button>

                  </RBS.Col>

                  <RBS.Col xs={6} id="button-column">

                    <RBS.Button
                      block
                      id="button"
                      className="save"
                      onClick={this.saveInput}
                      bsStyle="primary"
                    >
                    SAVE
                    </RBS.Button>

                  </RBS.Col>

                <div>
                  {/*OPTIONAL INSTRUCTIONS ON COPY FUNCTION*/}
                </div>

                {/* OUTPUT SECTION */}
                <RBS.Col xs={12}>

                  <div ref={ref => this.copyTextarea = ref}>
                    <h3 className="slugifyOutput">
                      {this.state.output}
                    </h3>
                  </div>

                </RBS.Col>


                {/* THIS IS THE SAVED SLUGS*/}

                <RBS.Col xs={12} id="saved-slugs">
                  <RBS.ListGroup>
                    {this.state.saved.map((savedSlug, idx) => (
                    <RBS.ListGroupItem key={idx}>
                      {savedSlug}
                    </RBS.ListGroupItem>))}
                  </RBS.ListGroup>
                </RBS.Col>


                  {/* DELETE SAVED SLUGS BUTTON - ONLY APPEARS WHEN THERE ARE SAVED SLUGS*/}
                <RBS.Col sm={12}>

                  {this.state.saved.length > 0 && <RBS.Button

                    id="button-clearAll"
                    className="resetSlugs"
                    onClick={this.resetSlugs}
                  >
                    DELETE PET SLUGS
                  </RBS.Button>}

                </RBS.Col>

            </RBS.Col>


            </RBS.Row>
          {/*HOT COPY function for both MAC and PC*/}
            <HotKey
                    keys={["meta", "c"]}
                    simultaneous
                    onKeysCoincide={this.copyCurrent}
                />

            <HotKey
                    keys={["control", "c"]}
                    simultaneous
                    onKeysCoincide={this.copyCurrent}
                />
          </RBS.Grid>
        )
    }
}


export default Slugify;
