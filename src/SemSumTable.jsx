function SemSummary({args}) {
  return (
    <table className="m-8 shadow-2xl w-2/3 rounded-lg overflow-hidden">
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