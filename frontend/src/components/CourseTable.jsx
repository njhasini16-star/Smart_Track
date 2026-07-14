function CourseTable({courses, onDelete}) {
  const basketProperties = {"Open Electives":{
    shortform:"Open", tailwind: "bg-amber-100 text-amber-700"
  }, 
    "Discipline Core Courses":{
      shortform:"Core", tailwind: "bg-blue-100 text-blue-700"
  }, 
    "Discipline Electives":{
      shortform: "Electives", tailwind: "bg-cyan-100 text-cyan-700"
  },
    "Math Basket":{
      shortform:"Math", tailwind:"bg-indigo-100 text-indigo-700"
  }, 
    "Materials Basket":{
      shortform:"Materials", tailwind: "bg-orange-100 text-orange-700"
  }, 
    "HSS Basket":{
      shortform:"HSS", tailwind: "bg-purple-100 text-purple-700"
  }, 
    "Science Basket": {
      shortform: "Science", tailwind: "bg-green-100 text-green-700"
  }, 
    "Institute level Courses":{
      shortform: "Institute", tailwind: "bg-slate-100 text-slate-700"
  }};

  return(<table className="rounded-xl overflow-hidden w-full border border-slate-600 table-fixed">
       <thead>
        <tr className="bg-slate-600 text-white ">
          <th className="w-21 !px-0">Code</th>
          <th >Course</th>
          <th className="w-18">Credits</th>
          <th className="w-23">Basket</th>
          <th className="w-16">Grade</th>
          <th className="w-18">Action</th>
        </tr>
       </thead>
       <tbody>
      {courses.length > 0 ? courses.map(course => (<tr key={course.id} className="bg-white">
        <td>{course.course_code || 'TBD'}</td>
        <td>{course.name || 'TBD'} </td>
        <td className="text-center">{course.credits || 'TBD'}</td>
        <td className="p-1"><span className={`${basketProperties[course.basket].tailwind} p-2 rounded-full`}>{basketProperties[course.basket].shortform}</span></td>
        <td className="text-center">{course.grade || '-'}</td>
        <td><button onClick={() => onDelete(course)} className="text-red-600 hover:cursor-pointer">Delete</button></td>
        </tr>)):<tr> <td className="text-gray-500 bg-white" colSpan={6}>No courses yet <br/>Search and add courses above</td></tr>}
      </tbody>
      </table>

  );
}

export default CourseTable;