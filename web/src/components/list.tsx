// import React, { useEffect } from 'react';
// import { useAppSelector, useAppDispatch } from '../store/store';
// import { addJob } from '../store/features/jobs';

// const List = () => {
//   const jobs = useAppSelector((state) => state.job.jobs);
//   const name = 'developer';
//   const dispatch = useAppDispatch();
//   useEffect(() => {
//     dispatch(addJob({ name: name }));
//   }, [dispatch, name]);

//   return (
//     <div>
//       <p>Job List</p>
//       <table>
//         <thead>
//           <tr>
//             <th>id</th>
//             <th>name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobs.map((job) => (
//             <tr key={job.id}>
//               <td>{job.id}</td>
//               <td>{job.name}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default List;

export {};
