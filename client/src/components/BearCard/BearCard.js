import React from "react";
import "./BearCard.css"

const BearCard = (props) => {
    return (
            <div className="card m-3 bear-image">
                <div className="card-body">
                    <img alt={props.image} src={props.image} height="" width="230px" onClick={() => props.handleClickImage(props.image)}/>
                </div>
            </div>
    )
};

export default BearCard;
