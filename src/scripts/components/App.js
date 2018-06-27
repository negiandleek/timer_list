import React from "react";

import ContainerTimerForm from "../containers/ContainerTimerForm";
import ContainerTimerList from "../containers/ContainerTimerList";

export default class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <main className="main">
                <ContainerTimerForm />
                <ContainerTimerList />
            </main>
        )
    }
}