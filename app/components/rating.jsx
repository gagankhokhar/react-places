import Star from 'star';
import React from 'react';
import './rating.css';
function render() {
    return <div className="rating">
        <div className="rating-0">
            <div className="rating-rating-4">
                <div className="rating-0-0-0">
                    <div onClick={() => this.props.setRating(1)} className="rating-star-1">
                        <Star state={(this.props.rating > 0 ? 'selected' : 'empty')} /> 
                    </div>
                    <div className="rating-0-0-0-1" /> 
                    <div onClick={() => this.props.setRating(2)} className="rating-star-7">
                        <Star state={(this.props.rating > 1 ? 'selected' : 'empty')} /> 
                    </div>
                    <div className="rating-0-0-0-3" /> 
                    <div onClick={() => this.props.setRating(3)} className="rating-star-4">
                        <Star state={(this.props.rating > 2 ? 'selected' : 'empty')} /> 
                    </div>
                    <div className="rating-0-0-0-5" /> 
                    <div onClick={() => this.props.setRating(4)} className="rating-star-8">
                        <Star state={(this.props.rating > 3 ? 'selected' : 'empty')} /> 
                    </div>
                    <div className="rating-0-0-0-7" /> 
                    <div onClick={() => this.props.setRating(5)} className="rating-star-79">
                        <Star state={(this.props.rating > 4 ? 'selected' : 'empty')} /> 
                    </div>
                    <div className="rating-0-0-0-9" /> 
                </div>
                <div className="rating-0-0-1" /> 
            </div>
        </div>
    </div>;
};

export default function(props) {
    return render.apply({props: props});
}