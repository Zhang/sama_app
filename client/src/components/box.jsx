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
        const { x, y } = this.props.coordinates;

        return (
          // Note - style={top: xx} accepts integer values, no need to coerce
          // If you want to coerce, you might also want to try `${y}px` for less characters
          <div style={{ position: 'absolute', top: y.toString() + 'px', left: x.toString() + 'px'}}>
              <textarea>Box</textarea><button onClick={this.remove}>x</button>
          </div>
        )
    }
}

export default Box;
