import React, { Component } from 'react';
import { FontMenu, ColorMenu } from '../components';
var fileSaver = require('file-saver');
//console.log(fileSaver);

class Edit extends Component {
  constructor (props) {
    super(props);
    this.save = () => {
      this.saveStyle(this.props.elements);
    }
    this.update = () => {
      this.editSave(this.props.elements);
    }
  }

  saveStyle(doc){
    return $.ajax({
      url: '/update',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({doc: doc})
    })
    .then(() => {
      this.props.showSave('visible');
    })
    .then(() => {
      setTimeout(() => {
        this.props.showSave('hidden');
      }, 3000);
    })
  }

  editSave(doc){
    return $.ajax({
      url: '/update' + id,
      type: 'PUT',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({doc: doc})
    })
  }

  exportAsSCSSFile(elements) {
    var text = "";
    var li = "liTags";
    var liStyles = "";
    for (var key in elements) {
      var elementType = key.toString();
      if (elementType === "ulTags") {
        for (var i = 0; i < elements[key][0].subType.length; i++) {
          liStyles += "liTags " + JSON.stringify(elements[key][0].subType[i].style) + "\n";

        }
      }
      for (var i = 0; i < elements[key].length; i++){
        var elementStyle = (JSON.stringify(elements[key][i].style));
        text += elementType + " " + elementStyle + "\n";
      }
    }
    text += liStyles;
    text = text.replace(/['"]+/g, '');
    text = text.replace(/,/g, ';\n  ');

    var filename = document.getElementById("input-fileName").value;
    if (filename === "") {
      filename = new Date().toTimeString();
    }
    var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    fileSaver.saveAs(blob, filename+".scss");
  };

  render() {
    return (
      <div
        className="editColumn"
      >
        <h1> Edit </h1>
        <FontMenu
          fontList={this.props.fontList}
          selectedElement={this.props.selectedElement}
          changeFont={this.props.changeFont}
        />
        <ColorMenu
          colorPalette={this.props.colorPalette}
          selectedElement={this.props.selectedElement}
          changeColor={this.props.changeColor}
        />
        <div>
          <button
            className="save"
            type="submit"
            onClick={this.save}
          >
            Save Template
          </button>
          <div style={this.props.savePopup}>
            Saved!
          </div>
        </div>

        <div>
          <button
            className="update"
            type="submit"
            onClick={this.update}
          >
            Update Template
          </button>
        </div>

        <form>
          <div>
            <label>File name</label>
            <input type="text"
              id="input-fileName"
              placeholder="Enter file name"></input>
          </div>
          <button
            type="submit"
            onClick={()=> this.exportAsSCSSFile(this.props.elements)}>Save to file</button>
        </form>
      </div>
    )
  }
}

export default Edit;