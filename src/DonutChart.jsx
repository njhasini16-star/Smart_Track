function Sector({ startAngle, endAngle, radius = 100, cx = 100, cy = 100, color = "tomato", name }) {
  // Convert degrees → radians
  const startRad = (Math.PI / 180) * startAngle;
  const endRad = (Math.PI / 180) * endAngle;

  // Compute start and end points
  const x1 = cx + radius * Math.cos(startRad);
  const y1 = cy + radius * Math.sin(startRad);
  const x2 = cx + radius * Math.cos(endRad);
  const y2 = cy + radius * Math.sin(endRad);

  const x4 = cx + (radius+10)* Math.cos((startRad + endRad)/2);
  const y4 = cy + (radius+10)* Math.sin((startRad + endRad)/2);
let textanch;
  if (x4 > 100) {
    textanch = "start";
  } else {
    textanch = "end"
  }

  // Large arc flag (needed if angle > 180°)
  const largeArc = (endRad - startRad) > Math.PI ? 1 : 0;

  // Path string
  const d = `
    M ${cx},${cy}
    L ${x1},${y1}
    A ${radius},${radius} 0 ${largeArc},1 ${x2},${y2}
    Z
  `;
  
  let num = ((endAngle-startAngle)*5)/18;
  let rounded = num.toFixed(2);

  return (<>
  <path d={d} fill={color} />
    <text x={x4} y={y4} textAnchor={textanch}
    dominantBaseline="middle" fill="black">{name}:{rounded}%</text>
    </>
  );
}
function DonutChart({completed, pending, remaining}) {
    const total = completed + pending + remaining;
    const angle1 = (remaining/total)*360;
    const angle2 = angle1 + (completed/total)*360;

return(<div className=" m-8 shadow-2xl rounded-2xl w-120">
      <h1 className="bg-red-200 p-2 text-center rounded-t-2xl">Credit Overview</h1>
    <div className="bg-yellow-100 p-0 leading-none h-80 flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="460" height="460" viewBox="-170 -170 500 500">
      {/* Background circle */}
      <circle className="shadow" cx="100" cy="100" r="100" fill="lightblue"/>
      {/* Custom sectors */}
      <Sector startAngle={0} endAngle={angle1} color="tomato" name="Remaining" />
      <Sector startAngle={angle1} endAngle={angle2} color="green" name="Completed"/>
      <Sector startAngle={angle2} endAngle={360} color="lightblue" name="Pending"/>

      <circle cx="100" cy="100" r="70" fill="white" />
    </svg>
    </div>
    <div className="border-t border-gray-200 border-b border-gray-100 p-2">
      <div className="bg-green-700 w-4 h-4 mr-2 inline-block"></div>
      Completed Credits: {completed}
    </div>
    <div className="border-y border-gray-100 p-2">
      <div className="bg-blue-300 w-4 h-4 mr-2 inline-block"></div>
      Pending Credits: {pending}
    </div>
    <div className="border-y border-gray-100 p-2">
      <div className="bg-red-400 w-4 h-4 mr-2 inline-block"></div>
      Remaining Credits: {remaining}
    </div>
    
    </div>);
}
export default DonutChart;