function getRandomData(amount = 50) {
    let array = []
    for (let i = 0; i < amount; i++) {
        let type = Math.floor(Math.random() * (1.5-0))//0 is an orange, 1 is a grapefruit
        let size = type === 0 ? Math.random() * (2.7-0.5) + 0.5 : Math.random() * (5-3.5) + 3.5;
        let colour =  type === 0 ? Math.random() * (2.5-0.1) + 0.1 : Math.random() * (5-3) + 3;
        let fill =  (colour * 5) + (size * 5);
        array.push({ x: size, y: colour, fill: `hsla(17,100%,${85 - fill}%,1)`, type: type });
    }
    return array;
}

export default getRandomData