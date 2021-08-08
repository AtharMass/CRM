import React from 'react';
import Badage from './Badge'
import CardGroup from 'react-bootstrap/CardGroup'
import chart1 from './icons/chart1.png'
import chart2 from './icons/chart2.png'
import chart3 from './icons/chart3.png'
import chart4 from './icons/chart4.png'

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

let badges =[
    {
        image: chart1,
        value: 14,
        description: `New ${ monthNames[(new Date()).getMonth()]} Clients`
    },
    {    
        image: chart2,
        value: 454,
        description: "Emails Sent"
    },
    {
        image: chart3,
        value: 289,
        description: "Outstanding Clients"
    },
    { 
        image: chart4,
        value: "France",
        description: "Hottest Country"
    }

]

function Badges() {
    return (
        <CardGroup>
            {badges.map((badge, index) => <Badage key={index} badge={badge}/>)}
        </CardGroup>
    );
  }
  
export default Badges;
  

// New Clients

//     This badge shows clients that have a firstContact from this current month and year
//     The explanation text - New XXX Clients - should be generated dynamically

// Emails Sent

//     You can generate this badge using a simple .filter to see how many clients do not have a null value in their emailTypeproperty

// Outstanding Clients

//     Again, use a simple filter on the sold property
//     Note that outstanding clients are clients to which we have not yet sold

// Hottest Country

//     You’ll need a bit of grouping and sorting, but it shouldn’t be too tricky to figure out the country with the most sale