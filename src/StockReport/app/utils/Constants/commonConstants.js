// this values used to draw lines on trend chart for durability, valuations and momentum
export const plotLinesValues = {
    durability: {
        good: 56, // greater than 55 
        medium: 35, // value between the 35 to 55  
        bad: 34, // less than 35 
    },
    momentum: {
        good: 61, // greater than 60 
        medium: 35, // value between the 35 to 60  
        bad: 34, // less than 35 
    },
    valuation: {
        good: 51, // greater than 50 
        medium: 30, // value between the 30 to 50  
        bad: 29, // less than 30 
    }
}

// this values used in zones list on trend chart for durability, valuations and momentum
export const zonesValues = {
    durability: {
        good: 100, // greater than 55 in good zone
        medium: 55, // value between the 35 to 55  in medium zone
        bad: 35, // less than 35 in bad zone
    },
    momentum: {
        good: 100, // greater than 60 in good zone
        medium: 60, // value between the 35 to 60 in medium zone
        bad: 35, // less than 35 in bad zone
    },
    valuation: {
        good: 100, // greater than 50 in good zone
        medium: 50, // value between the 30 to 50  in medium zone
        bad: 30, // less than 30 in bad zone
    }
}

export const getZonesList = (type) => {
    return [{
        value: zonesValues[type].bad,
        color: '#fc5a5a',
        fillColor: '#fc5a5a'
      }, {
        value: zonesValues[type].medium,
        color: '#ff9633',
        fillColor: '#ff9633'
      },{
        value: zonesValues[type].good,
        color: '#00a25b',
        fillColor: '#00a25b'
      }]
}