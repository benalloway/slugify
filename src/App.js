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
        alertMessage: '',
        isAlertOpen: false
      }

      this.input = null;
      this.setInput = this.setInput.bind(this)
      this.clearInput = this.clearInput.bind(this)
      this.copyCurrent = this.copyCurrent.bind(this)
      this.onCopySuccess = this.onCopySuccess.bind(this)
      this.giveInputFocus = this.giveInputFocus.bind(this)
    }

// saves slugs to local memory onclick save button
    componentDidUpdate(prevProps, prevState) {

    }

// this pulls saved slugs from locale memory if ther are ones
    componentDidMount() {
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
    clearInput() {
      this.setState({

        input: '',
        output: ''
      })

      this.giveInputFocus();
    }

    // HOT COPY FUNCTION

    copyCurrent() {
          if(this.input !== document.activeElement) {
            return;
          }
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
              <RBS.Col sm={8} smOffset={2} xs={10} xsOffset={1}>

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
                        placeholder="CMD+V to paste CMD+C to copy CMD+B to clear"
                        onChange={this.setInput}
                        inputRef={ref => this.input = ref}
                        bsSize="large"
                      />

                      {/* SAVED TO CLIPBOARD NOTIFICATION - ONLY APPEARS WHEN cmd+C or CTRL+C are pressed */}
                      {this.state.isAlertOpen && <RBS.InputGroup.Addon>
                        {this.state.alertMessage}
                      </RBS.InputGroup.Addon>}

                    </RBS.InputGroup>

                  </RBS.FormGroup>

                </RBS.Col>

              {/* CLEAR AND SAVE BUTTON*/}

                  <RBS.Col xs={12} id="button-column">

                    <RBS.Button
                      block
                      id="button"
                      className="reset"
                      onClick={this.clearInput}
                      bsStyle="danger"
                    >
                      CLEAR
                    </RBS.Button>

                  </RBS.Col>

                {/* OUTPUT SECTION */}
                <RBS.Col xs={12}>

                  <div ref={ref => this.copyTextarea = ref}>
                    <h3 className="slugifyOutput">
                      {this.state.output}
                    </h3>
                  </div>

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

          {/* CLEAR FUNCTION */}
          <HotKey
                  keys={["meta", "b"]}
                  simultaneous
                  onKeysCoincide={this.clearInput}
              />
          <HotKey
                  keys={["control", "b"]}
                  simultaneous
                  onKeysCoincide={this.clearInput}
              />
          </RBS.Grid>
        )
    }
}


export default Slugify;
