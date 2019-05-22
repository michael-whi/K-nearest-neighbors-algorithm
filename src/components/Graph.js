import React, { Component, Fragment } from 'react';
import Plot from 'react-plotly.js';
import { getNearestNeighbours } from '../math/mathDistance'
import update from 'immutability-helper'
import getRandomColor from './../utils/randomColor'

class Graph extends Component {

    state = { data: [], lastPoint: null };

    onCreateNewPoint() {
        if (this.o) {
            const newPoint = {
                "type": "scatter",
                "mode": "markers",
                "x": this.o.xvals,
                "y": this.o.yvals,
                "marker": {
                    "color": "#777777",
                    "size": [10 * this.o.xvals / 2],
                    "sizeref": 1,
                    "sizemin": 1
                },
                "text": [this.o.xvals, this.o.yvals]
            }
            const updatedList = update(this.state.data, { $push: [newPoint] })
            this.calculateAndUpdateData(updatedList, newPoint)
        }
    }

    calculateAndUpdateData(updatedList, newPoint){
        const { data } = this.state
        this.setState({ data: updatedList, lastPoint: newPoint }, () => {
            const dataForCalculation = []
            let updatedData
            const pointIndex = updatedList.findIndex(point => point.x[0] === newPoint.x[0] && point.y[0] === newPoint.y[0])
            
            data.forEach((f) => {
                if(f.type !== "line") dataForCalculation.push({ x: f.x, y: f.y, type: f.fruit.type })
            })

            const neighbourList = getNearestNeighbours(
                newPoint.x[0], 
                newPoint.y[0], 
                5, 
                dataForCalculation
            )
            const lineList = this.createLines(neighbourList, updatedList, pointIndex)
            updatedData = update(updatedList, { $push: lineList })
            
            const nearest = updatedList.find( p => p.x[0] === neighbourList[0].x[0] && p.y[0] === neighbourList[0].y[0])
            updatedData = update(updatedData, { 
                [pointIndex]: {
                    fruit: { $set: {"fill" : nearest.fruit.fill, "type": nearest.fruit.type} },
                    text: { $set: [nearest.fruit.type === 0 ? "orange" : "grapefruit"] }, 
                    marker: { color: {$set: nearest.fruit.fill } } 
                } 
            })
            this.setState({ data: updatedData })
        })     
    }

    createLines(neighbourList, updatedList, pointIndex){
        const currentColor = getRandomColor()
        const lines = neighbourList.map((n) => (
            {
                "type": "line",
                "x": [n.x[0], updatedList[pointIndex].x[0]],
                "y": [n.y[0], updatedList[pointIndex].y[0]],
                "marker": {
                    "color": currentColor 
                },
                "text": [n.distance]
            }
        ))
        return lines
    }

    makeDataForGraph(){
        const data = this.props.data.map(f => ({
            "fruit": {"fill" : f.fill, "type": f.type},
            "type": "scatter",
            "mode": "markers",
            "x": [f.x],
            "y": [f.y],
            "marker": {
                "color": f.fill,
                "size": [10 * (f.x / 2)],
                "sizeref": 1,
                "sizemin": 1
            },
            "text": [f.type === 0 ? "orange" : "grapefruit"]
        }))
        this.setState({ data })
    }

    componentDidMount() {
        this.makeDataForGraph()
    }

    render() {
        return (
            <Fragment>
                {this.state.data.length > 0 && <Plot
                    data={this.state.data}
                    layout={{ width: '100%', height: '100%', title: 'Oranges and grapefruits' }}
                    onHover={(o) => this.o = o}
                    onDoubleClick={this.onCreateNewPoint.bind(this)}
                />}
            </Fragment>
        );

    }

}

export default Graph;