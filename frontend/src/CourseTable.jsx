function CourseTable({courses, onDelete}) {
  return(<table>
       <thead>
        <tr>
          <th>Code</th>
          <th>Course</th>
          <th>Credits</th>
          <th>Grade</th>
          <th>Action</th>
        </tr>
       </thead>
       <tbody>
      {courses.length > 0 ? courses.map(course => (<tr key={course.id}>
        <td>{course.course_code || 'TBD'}</td>
        <td>{course.name || 'TBD'} </td>
        <td>{course.credits || 'TBD'}</td>
        <td>{course.grade || '-'}</td>
        <td><button onClick={() => onDelete(course.id)}>Delete</button></td>
        </tr>)):<tr> <td className="text-gray-500" colSpan={4}>No courses yet <br/>Search and add courses below</td></tr>}
      </tbody>
      </table>

  );
}

export default CourseTable;