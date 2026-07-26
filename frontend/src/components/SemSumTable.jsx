function SemSummary({args, joiningYear}) {
  const zero = 0;
  const zeroWithDecimals = zero.toFixed(2);

  return (
    <table className="shadow-2xl rounded-lg overflow-hidden md:col-span-2 border border-slate-600">
      <thead>
  <tr className="bg-slate-600 text-white text-center">
    <td className="rounded-t-lg" colSpan={4}>Semester Summary</td>
  </tr>
  <tr className="bg-slate-600 text-white">
    <th>Semester</th>
    <th>Credits</th>
    <th>GPA</th> 
    <th>Highlights</th>
  </tr>
  </thead>
  <tbody>
      {args.map((arg, index) => (
        <tr className="text-center bg-white " key={index}>
          <td>Sem {arg.sem}<div className=" hidden sm:inline-block">, {arg.sem%2==0 ? "Spring" : "Fall"} {joiningYear + Math.floor(arg.sem/2)}</div></td>
          <td>{arg.credits || 0}</td>
          <td>{arg.gpa || zeroWithDecimals}</td>
          <td>{arg.highlights}</td>
        </tr>
      ))}
      </tbody>
</table>
  )
}

export default SemSummary;