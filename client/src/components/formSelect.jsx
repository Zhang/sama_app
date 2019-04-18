import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { getPDFImage, getSavedPDFs, getSavedPDF } from '../api/pdfApi';

class FormSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
        this.getPDF = this.getPDF.bind(this);
        this.goToSavedForm = this.goToSavedForm.bind(this);
    }

    componentDidMount() {
        getSavedPDFs().then(pdf => {
            this.setState({
                savedPDFs: pdf.data
            })
        })
    }

    getPDF = (e) => {
        const name = e.target.name
        getPDFImage(name).then(form => {
            const location = {
                pathname: '/form',
                state: { image: form.data.imageUrl, formType: name }
            }
            this.props.history.push(location)
        })
    }

    goToSavedForm = (e) => {
      getSavedPDF(e.target.value).then(form => {
          const id = form.data._id;
          const formTitle = form.data.formTitle;
          const formType = form.data.formType;
          getPDFImage(form.data.formType).then(image => {
              const location = {
                  pathname: `/form/${id}`,
                  state: {
                      image: image.data.imageUrl,
                      formTitle: formTitle,
                      formType: formType,
                      id: id
                  }
              }
              this.props.history.push(location)
          })
      })

    }

    render() {
      return (
            <div>
                <ul style={{ listStyle: "none"}}>
                    <li><button name="1" onClick={this.getPDF}>New Form 1</button></li>
                    <li><button name="2" onClick={this.getPDF}>New Form 2</button></li>
                    <li>
                      <select onChange={this.goToSavedForm}>
                        <option value="" selected disabled hidden>Select Form</option>
                      {
                          this.state.savedPDFs &&
                          this.state.savedPDFs.map(pdf => {
                              return (
                                <option value={pdf._id}>{pdf.formTitle}</option>
                              )
                          })
                      }
                      </select>
                    </li>
                </ul>
            </div>
        )
    }
}

export default withRouter(FormSelect);
