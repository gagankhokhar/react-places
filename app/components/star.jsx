import React from 'react';
import './star.css';
function render() {
    return <div className="pd-onhover-parent star">
        { (this.props.state == "selected") ?
            <div className="star-0-0">
                <div className="star-0-0-0">
                    <div className="star-selected-7">
                        <div className="star-0-0-0-0-0">
                            <img src="https://ucarecdn.com/538d382e-9f20-4973-84ca-83dc739420f6/" className="star-image-5" /> 
                        </div>
                    </div>
                </div>
            </div>
        : null}
        { (this.props.state == "empty") ?
            <div className="star-1-0">
                <div className="star-1-0-0">
                    <div className="star-empty-6">
                        <div className="star-1-0-0-0-0">
                            <img src="https://ucarecdn.com/2e499468-33c5-4664-b306-a3b20176cde3/" className="star-image-53" /> 
                        </div>
                    </div>
                </div>
            </div>
        : null}
        <div className="pd-onhover star-2">
            <div className="star-2-0">
                <div className="star-highlighted_hover-0">
                    <div className="star-2-0-0-0">
                        <img src="https://ucarecdn.com/5353b2ff-7c59-47e9-8ffc-2bc193fea001/" className="star-image-2" /> 
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default function(props) {
    return render.apply({props: props});
}