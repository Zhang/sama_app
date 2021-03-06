import React from 'react';
import Box from './box';
import { withRouter, Link } from 'react-router-dom';
import { getPDFImage, savePDF, editSavedPDF, deletePDF, getBoxes, saveBox, deleteBox } from '../api/pdfApi';

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            formTitle: '',
            formType: '',
            boxIds: [],
            boxes: [ ],
            isNew: true,
            createBoxMode: false,
            x: 0,
            y: 0
        }

        this.renderBoxes = this.renderBoxes.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this.createNewBox = this.createNewBox.bind(this);
        this.deleteBox = this.deleteBox.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
    }

    componentDidMount() {
        if (this.props.location.state.formType) {
          getBoxes().then(boxes => {
              this.setState({
                  boxes: boxes.data
              })
          })
            this.setState({
                formType: this.props.location.state.formType,
                formTitle: this.props.location.state.formTitle,
                isNew: false,
                id: this.props.location.state.id
            })
        }
    }

    handleInputChange = (e, field) => {
        this.setState({
            [field]: e.target.value
        })
    }

    createNewForm = () => {
        savePDF(this.state).then(form => {
            const location = {
                pathname: `/form/${form.data._id}`,
                state: {
                    id: form.data._id,
                    image: this.props.location.state.image,
                    formTitle: form.data.formTitle,
                    formType: form.data.formType
                }
            }
            this.props.history.push(location);
        }).catch(err => console.log(err))
    }

    updateForm = () => {
        // this will involve saving form and the boxes
    }

    deleteForm = () => {
        const id = this.state.id;
        deletePDF(this.props.match.params.id).then((data) => {
          this.props.history.push('/');
        })
    }

    renderBoxes = () => {
        return (
            <div>
                {
                  this.state.boxes.map(boxData => {
                      return (
                          <div>
                            <Box
                                coordinates={boxData.coordinates}
                                id={boxData._id}
                                label={'text'}
                                delete={this.deleteBox}
                            />
                          </div>
                      )
                    })
                }
            </div>
        )
    }

    startBoxCreation = () => {
        this.setState({
            createBoxMode: true
        })
    }

    createNewBox = () => {
        // something that onclick will set the coordinates.
        // we will create a box and the data will be then sent to the DB and back
        // here up to state.
        // Once the functionality works, then we go for the association.
        const tempBoxData = {
            boxTitle: 'text',
            boxType: 'textarea',
            boxData: 'null',
            coordinates: {x: this.state.x, y: this.state.y},
            dimensions: {height: null, width: null},
            formId: this.props.match.params.id
        }


        saveBox(tempBoxData).then(box => {
            const appendNewBox = this.state.boxes.slice().concat(box.data);
            this.setState({
                boxes: appendNewBox,
                createBoxMode: false
            })
        })
    }

    deleteBox = (id) => {
        deleteBox(id).then(() => console.log('deleted')).catch(err => console.log(err))
    }

    _onMouseDown = (e) => {
      // Instead of tracking positions when the mouse moves, the event also comes with
      // clientX and clientY props, saving you relatively expensive re-renders
      // I believe it's accessed as e.clientY
      this.createNewBox();
    }

    _onMouseMove = (e) => {
      this.setState({ x: e.pageX, y: e.pageY });
    }

    render() {
      const isNew = this.props.location.state.formTitle ? false : true;
      // const isNew = !this.props.location.state.formTitle
      const { x, y } = this.state;
      // I don't think these state props are used
      return (
            <div onMouseMove={this._onMouseMove} onMouseDown={this.state.createBoxMode && this._onMouseDown}>
                <div>
                    {
                      isNew
                      ?
                      <div>
                          <input onChange={e => this.handleInputChange(e, 'formTitle')}/>
                          <button onClick={this.createNewForm}>Save Form</button>
                      </div>
                      :
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          <h4>{this.props.location.state.formTitle}</h4>
                          <button onClick={this.updateForm} style={{ height: '30px', margin: '10px'}} >Update Form</button>
                          <button onClick={this.deleteForm} style={{ height: '30px', margin: '10px'}}>Delete Form</button>
                          <button onClick={this.startBoxCreation} style={{ height: '30px', margin: '10px', backgroundColor: 'honeydew'}}>Create Box</button>
                      </div>
                    }
                </div>
                <div
                    style={{
                        backgroundImage: "url(" + this.props.location.state.image + ")",
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        height: '100vh',

                    }}>
                    {this.renderBoxes()}
                </div>
            </div>
        )
    }
}

export default Form;
