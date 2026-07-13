function CreditProgressBar({group, groupName, groupTotal}) {
    const percentage = (group/groupTotal)*100;

    let colour;
  if (percentage < 30) {
    colour = "bg-red-400";
  } else if (percentage < 70) {
    colour = "bg-amber-400";
  } else if (percentage < 99) {
    colour = "blue";
  } else {
    colour = "green";
  }
  
    return(
        <div className="p-2 border-t border-gray-200 border-b border-gray-200 flex items-center min-w-max ">
            <div className="inline-flex flex-shrink-0 mr-3">{groupName}</div>
  <div className="w-35 h-4 ml-auto bg-slate-300 rounded-full overflow-hidden">
  <div
    className={`h-full ${percentage >= 100 ? "rounded-full" : "rounded-l-full"} ${colour}`}
    style={{
      width: `${percentage}%`,
      
    }}
  />
</div>
<div className="ml-4 font-medium">{group} /{groupTotal}</div>
        </div>
    );
}
function AcademicProgress({core, electives, baskets, cgpa}) {
    return(
    <div className="bg-white md:mt-8 shadow-2xl rounded-2xl overflow-hidden w-full h-fit border border-slate-600">
        <h1 className="p-2 rounded-t-lg bg-slate-600 text-white text-center">Academic Progress</h1>
        <h1 className="px-2 py-8 text-xl h-55">Overall CGPA:<div className="text-6xl my-4">{cgpa}</div></h1>
        <CreditProgressBar group={core} groupName="Discipline Core" groupTotal={36}/>
        <CreditProgressBar group={electives} groupName="Discipline Electives" groupTotal={30}/>
        <CreditProgressBar group={baskets} groupName="Other Baskets" groupTotal={45}/>
        <div className="p-2">Alerts</div>

    </div>);
}

export default AcademicProgress;