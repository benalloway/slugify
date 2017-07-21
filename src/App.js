import React from 'react';
import slug from 'slug';
import * as RBS from 'react-bootstrap';
import './App.css';
import HotKey from 'react-shortcut';

class Slugify extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        input: '',
        output: '',
        saved: [], // saved is an array, to store all the saved events
        alertMessage: '',
        isAlertOpen: false
      }


      this.setInput = this.setInput.bind(this)
      this.resetInput = this.resetInput.bind(this)
      this.saveInput = this.saveInput.bind(this)
      this.resetSlugs = this.resetSlugs.bind(this)
      this.copyCurrent = this.copyCurrent.bind(this)
      this.onCopySuccess = this.onCopySuccess.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {

      if(this.state.saved.length > prevState.saved.length){
        window.localStorage.setItem("savedSlugs", JSON.stringify(this.state.saved))
      }

    }

    componentDidMount() {

      if(window.localStorage.getItem("savedSlugs")){
        this.setState({
          saved: JSON.parse(window.localStorage.getItem("savedSlugs"))
        });
      }

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
      });
      
      

    }

    // reset all button
    /*eslint no-restricted-globals: 0*/
    resetSlugs() {
      if(confirm("Are you sure you want to delete your pet slugs?")) {
        if(process.env.NODE_ENV === "development" && confirm("Are you SUUUUUUUUUUUREEEEEE??")) {
          window.localStorage.clear();

          this.setState({saved: []})
        }
      }


    }

    // HOT COPY

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

                {this.state.isAlertOpen && <div>{this.state.alertMessage}</div>}

                <RBS.Col xs={12}>  

                  <svg id="Layer_1" style={{"enableBackground":"new 0 0 30 30", "maxWidth":"275px"}} version="1.1" viewBox="0 0 30 30" x="0px" y="0px" xmlSpace="preserve">
                    <path d="M28.5,16.3L30,9.1c0.1-0.3-0.1-0.5-0.4-0.6c-0.3-0.1-0.5,0.1-0.6,0.4L27.6,16c0,0-0.1,0-0.1,0L27,10c0-0.3-0.3-0.5-0.5-0.5  C26.2,9.5,26,9.8,26,10l0.5,6.1c-0.4,0.1-0.7,0.2-1.1,0.3l0,0c-1.4,2-4.8,4.1-6.9,4.1c-1.9,0-3.8-0.1-5.2-1.1  c-0.1-0.1-0.2-0.2-0.2-0.4c0-0.1,0-0.3,0.2-0.4l1.2-1.1c1.5-1.9,1.6-4.7,1.6-5.5c0-1.8-1.2-5.5-5-5.5c-3.7,0-5,2.7-5,5  c0,2.7,2.1,3,3,3c1.5,0,3-1.3,3-2.5c0-1.1-0.4-1.5-1.5-1.5C9.4,10.5,9,10.9,9,12c0,0.3-0.2,0.5-0.5,0.5S8,12.3,8,12  c0-1.6,0.9-2.5,2.5-2.5c1.7,0,2.5,0.8,2.5,2.5c0,1.8-1.9,3.5-4,3.5c-1.9,0-4-1.1-4-4c0-3,1.9-6,6-6c4.1,0,6,3.8,6,6.5  c0,1.1-0.2,4-1.8,6.1l-0.8,0.7c1.2,0.5,2.6,0.6,4.1,0.6c1.8,0,5.2-2.3,6.2-3.9l0,0c0.3-0.7,0.3-1.6,0.3-2.7c0-0.3,0-0.5,0-0.8  c0-2-3-9.5-12-9.5C4.8,2.5,1,7.9,1,13c0,3,1.3,5.3,3.8,6.5c-0.5,0.4-1.4,1.1-2.6,1.6C0.1,21.8,0,24.9,0,25c0,0.2,0.1,0.4,0.3,0.4  c0.2,0.1,0.4,0.1,0.5,0c0,0,1.3-0.9,4.1-0.9c1.6,0,2.6,0.6,3.6,1c0.7,0.4,1.3,0.7,2.1,0.7c0.5,0,0.6,0.1,0.8,0.4  c0.3,0.4,0.6,0.8,1.7,0.8c1,0,1.4-0.3,1.8-0.6c0.3-0.2,0.6-0.4,1.2-0.4c0.6,0,0.9,0.2,1.3,0.4c0.4,0.3,1,0.6,1.9,0.6  c1.4,0,1.6-1,1.8-1.6c0.1-0.4,0.2-0.8,0.4-1c0.2-0.2,0.4-0.1,1,0.1c0.6,0.2,1.4,0.6,2.1-0.1c0.6-0.6,0.7-1.1,0.8-1.5  c0.1-0.4,0.1-0.6,0.5-1c0.6-0.5,2-0.1,2.4,0.1c0.2,0.1,0.5,0,0.6-0.2c0-0.1,1.1-1.7,1.1-3.3C30,17.8,29.4,16.8,28.5,16.3z"/>
                  </svg>

                </RBS.Col>

                <RBS.Col xs={12}>  

                  <RBS.FormControl                          
                    value={this.state.input}
                    placeholder="SLUGIFY ME, BABY!"
                    onChange={this.setInput}                           
                  />

                </RBS.Col>  
                
                <RBS.Col sm={6}>  

                  <RBS.Button 
                    block
                    className="reset"
                    onClick={this.resetInput}
                  > 
                    CLEAR
                  </RBS.Button>
                
                </RBS.Col>    
                
                <RBS.Col sm={6}>    

                  <RBS.Button
                    block
                    className="save"
                    onClick={this.saveInput}
                  >
                  SAVE ME
                  </RBS.Button>
                
                </RBS.Col>

                <RBS.Col sm={12}>  

                  {this.state.saved.length > 0 && <RBS.Button                     
                    block
                    className="resetSlugs"
                    onClick={this.resetSlugs}
                  > 
                    DELETE SAVED
                  </RBS.Button>}
                
                </RBS.Col>                  
                
                <RBS.Col xs={12}>  
            
                  <div ref={ref => this.copyTextarea = ref}>{this.state.output}</div>
            
                </RBS.Col>  
            
                <RBS.Col xs={12}>
                  <RBS.ListGroup>
                    {this.state.saved.map((savedSlug, idx) => (                  
                    <RBS.ListGroupItem key={idx}>
                      {savedSlug}
                    </RBS.ListGroupItem>))}
                  </RBS.ListGroup>
                </RBS.Col>

                <div>
                  {/*instructions on copy function*/}
                </div>

            </RBS.Col>     

            
            </RBS.Row>
          {/*HOT COPY*/}
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
