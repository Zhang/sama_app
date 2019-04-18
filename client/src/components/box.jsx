import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { getPDFImage, savePDF, editSavedPDF, deletePDF } from '../api/pdfApi';

class Box extends React.Component {
    constructor(props) {
        super(props);

        this.remove = this.remove.bind(this);
    }

    remove = () => {
       this.props.delete(this.props.id);
       window.location.reload();
    }
    render() {
      console.log(this.props)
        const { x, y } = this.props.coordinates;

        return (
          <div style={{ position: 'absolute', top: y.toString() + 'px', left: x.toString() + 'px'}}>
              <textarea>Box</textarea><button onClick={this.remove}>x</button>
          </div>
        )
    }
}

export default Box;
