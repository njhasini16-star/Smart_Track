import { useParams } from "react-router-dom";
import { useState } from "react";

function SemHistory() {
    const {semId} = useParams();
    return (<div className="mx-8">
        <h1 className="mb-8">This is {semId}</h1>
        </div>
    );
}
export default SemHistory;