import React from "react";

export function Cards({ children }) {
  return (
    <div className="card-columns">
      {children}
    </div>
  );
}

export function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export function CardImage(props) {
  return(
    <img {...props} className="card-img-top" />
  );
}

export function CardBody({ children }) {
  return(
    <div className="card-body">
      {children}
    </div>    
  );
}

export function CardTitle({ children }) {
  return(
    <h5 className="card-title">
      {children}
    </h5>    
  );
}

export function CardText({ children }) {
  return(
    <p className="card-text">
      {children}
    </p>    
  );
}

export function CardAuthor({ children }) {
  return(
    <h6 className="card-text">
        Author(s): {children}
    </h6>
  );
}

export function CardButtonGroup({ children }) {
  return(
    <div className="btn-group">
      {children}
    </div>  
  );
}

export function CardButtonSave(props) {
  return(
    <button {...props} type="button" className="btn btn-primary btn-sm">Save</button>
  );
}

export function CardButtonDelete(props) {
  return(
    <button {...props} type="button" className="btn btn-danger btn-sm">Delete</button>
  );
}

export function CardButtonSaved(props) {
  return(
    <a {...props} role="button" className="btn btn-success btn-sm">Saved</a>
  );
}

export function CardButtonLink(props) {
  return(
    <a {...props} role="button" className="btn btn-secondary btn-sm">View on Google</a>
  );
}