import { useEffect } from "react";
import './Alert.css';

function Alert({type, msg, removeAlert, list}) {
    useEffect(_ => {
        const timeout = window.setTimeout(_ => {
            removeAlert();
        }, 3000);
        return _ => clearTimeout(timeout);
    }, [list]);
    return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert;
