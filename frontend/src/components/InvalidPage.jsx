import React from 'react'

function InvalidPage() {
  return (
    <div style={{ backgroundColor: "white" , width : "100%" , height: "100vh"}}>
        <div style = {{marginTop: "100px" , color: "red" ,margin: "45vh", textAlign: "center"}}>
            <h1 style={{fontSize : "6rem" }}>NOT AUTHORIZED</h1>
            <p style={{fontSize: "2rem"}}>You Are Not Allowed To Access This Page</p>
        </div>

    </div>
  )
}

export default InvalidPage