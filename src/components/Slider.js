import React from 'react';
import ReactDOM from 'react-dom';
import Slider, { Range, createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
 

function log(value) {
    console.log(value);
}

const SliderWithTooptip = createSliderWithTooltip(Slider);

class CustomizeSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            min: 0.25,
            max: 1,
        };
    }
    onSliderChange = (value) => {
        log(value);
        this.setState({
            value,
        })
    }
    onAfterChange = (value) => {
        console.log(value);
    }
  
    render() {
        return (
            <Slider step={0.25} 
                    defaultValue={1} 
                    value={this.state.value}
                    onChange={this.onSliderChange}
                    onAfterChange={this.onAfterChange}
                    min={this.state.min} 
                    max={this.state.max}
            />         
        );   
    }
}


export default CustomizeSlider;