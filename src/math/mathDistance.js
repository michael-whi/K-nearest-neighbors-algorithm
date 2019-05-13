import _ from 'lodash';

const getDistanceByXYSimple = (x1, y1, x2, y2) => {
    const calculated = ((x1-x2)*2) + ((y1-y2)*2)
    return Math.sqrt(calculated < 0 ? calculated*(-1) : calculated)
}

/*
*@param {number} pointX, pointY Coordinates of point which will search from.
*@param {number} amount Amount of nearest points.
*@param {array} array Array of objects with {x,y}
*/
const getNearestNeighbours = (pointX, pointY, amount, array) => {
    let hashTable = []
    array.forEach(element => {
        hashTable.push({ x: element.x, y: element.y, distance: getDistanceByXYSimple(pointX, pointY, element.x, element.y) })
    })
    hashTable = _.sortBy(hashTable, ['distance'])
    return hashTable.slice(0, amount)
}

export {getDistanceByXYSimple, getNearestNeighbours}