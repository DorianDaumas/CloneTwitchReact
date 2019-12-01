import React from 'react'

export default function Error() {
    const styleBackground = {
        textAlign: "center",
        height: "93vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%"
    }
    return (
        <div style={styleBackground}>
            <p style={{color: "black"}}>Pas de résultats,</p>
            <p style={{color: "black"}}>Vérifiez l'orthographe de votre saisie.</p>
        </div>
    )
}
