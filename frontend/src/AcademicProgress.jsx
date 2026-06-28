function CreditProgressBar({group, groupName, groupTotal}) {
    return(
        <div className="p-2 border-t border-gray-200 border-b border-gray-200 flex items-center min-w-max ">
            <div className="inline-flex flex-shrink-0 mr-3">{groupName}</div>
            <div className="inline-flex bg-green-500 h-4 flex-shrink-0 ml-auto mr-0" style={{width:`${((group/groupTotal)*20)*4}px`}}></div>
            <div className="inline-flex bg-red-500 h-4 flex-shrink-0 mr-2" style={{width:`${(20-(group/groupTotal)*20)*4}px`}}></div>
            <div className="inline-flex flex-shrink-0 mr-0">{group}/{groupTotal} credits</div>
        </div>
    );
}
function AcademicProgress({core, electives, baskets, cgpa}) {
    return(
    <div className="md:mt-8 shadow-2xl rounded-2xl overflow-hidden w-full h-fit">
        <h1 className="p-2 rounded-t-lg bg-red-200">Academic Progress</h1>
        <h1 className="px-2 py-8 text-xl">Overall CGPA: {cgpa}</h1>
        <CreditProgressBar group={core} groupName="Discipline Core" groupTotal={36}/>
        <CreditProgressBar group={electives} groupName="Discipline Electives" groupTotal={30}/>
        <CreditProgressBar group={baskets} groupName="Other Baskets" groupTotal={45}/>
        <div className="p-2">Alerts</div>

    </div>);
}

export default AcademicProgress;