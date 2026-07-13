import { PieChart, Pie, Tooltip, ResponsiveContainer, Sector } from 'recharts';

function Donut({completed, pending, remaining}) {

    const data = [
        { name: 'Completed', credits: completed, color: "#10B981" },
        { name: 'Pending', credits: pending, color: "#F59E0B" },
        { name: 'Remaining', credits: remaining, color: "#CBD5E1" }
    ];
    
    const CustomSector = (props) => {
    return (
        <Sector
            {...props}
            fill={props.payload.color}
        />
      );
    };

    return (
      <ResponsiveContainer width="100%" height={300} >
        <PieChart >
            <Pie
              data={data}
              dataKey="credits"
              nameKey="name"
              innerRadius={65}
              outerRadius={110}
              paddingAngle={1}
              cornerRadius={4}
              shape={CustomSector}
            />
            <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
}


function DonutChart({completed, pending, remaining}) {
console.log({ completed, pending, remaining });
return(<div className="mt-8 shadow-2xl rounded-2xl border-1 border-slate-600">
      <h1 className="bg-red-300 p-2 text-center text-white rounded-t-2xl">Credit Overview</h1>
    <div className='relative'>
    <div className="bg-white p-0 leading-none h-60 flex items-center">
    <Donut completed={completed} pending={pending} remaining={remaining}/>
    </div>
    <div className='absolute inset-0 top-21 flex flex-col items-center'>
    <div className='text-4xl font-bold'>{completed + pending + remaining}</div>
    <div className='font-sm'>Total Credits</div>
    </div>
    </div>
    
    <div className="bg-white border-t border-gray-200 p-3 flex items-center">
  <div className="w-4 h-4 rounded-full bg-[#10B981] mr-3"></div>

  <span>Completed Credits</span>

  <span className="ml-auto font-medium font-semibold text-slate-600">{completed}</span>
</div>

<div className="bg-white border-y border-gray-200 p-3 flex items-center">
  <div className="w-4 h-4 rounded-full bg-[#F59E0B] mr-3"></div>

  <span>Pending Credits</span>

  <span className="ml-auto font-medium font-semibold text-slate-600">{pending}</span>
</div>

<div className="bg-white rounded-b-2xl border-b border-gray-200 p-3 flex items-center">
  <div className="w-4 h-4 rounded-full bg-[#CBD5E1] mr-3"></div>

  <span>Remaining Credits</span>

  <span className="ml-auto font-medium font-semibold text-slate-600">{remaining}</span>
</div>
    </div>);
}
export default DonutChart;