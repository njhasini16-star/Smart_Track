function SemSummary({args}) {
  return (
    <table className="shadow-2xl rounded-lg overflow-hidden md:col-span-2">
  <tr className="bg-red-200">
    <td className="rounded-t-lg" colSpan={4}>Semester Summary</td>
  </tr>
  <tr className="bg-red-200">
    <th>Semester</th>
    <th>Credits</th>
    <th>GPA</th> 
    <th>Highlights</th>
  </tr>
      {args.map((arg, index) => (
        <tr className="text-center" key={index}>
          <td>Sem {arg.sem}- {arg.sem%2==0 ? "Spring": "Fall"} 2025</td>
          <td>{arg.credits}</td>
          <td>{arg.gpa}</td>
          <td>{arg.highlights}</td>
        </tr>
      ))}
</table>
  )
}

export default SemSummary;