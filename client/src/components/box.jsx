import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { getPDFImage, savePDF, editSavedPDF, deletePDF } from '../api/pdfApi';

class Box extends React.Component {
    render() {
        const { x, y } = this.props.coordinates;

        return (
          <div style={{ position: 'absolute', top: y.toString() + 'px', left: x.toString() + 'px'}}>
              <textarea>Box</textarea>
          </div>
        )
    }
}

export default Box;
