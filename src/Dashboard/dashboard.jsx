import React from "react";

export default class Dashboard extends React.Component {
    componentDidMount() {
        console.log("mounted");
    }
    render() {
        return (
            <div style={{marginLeft:"250px",marginTop:"250px"}}>
                hello dashboard 
                <br/>
                THis is Dashboard
            </div>
        )
    }
}
