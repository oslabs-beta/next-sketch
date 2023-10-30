// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import Checkbox from '@mui/material/Checkbox';
//import { modalLayout } from '../../utils/interfaces';

// const Modals = ({open, handleModalChange}: any) => {

//     const style = {
//         position: 'absolute' as 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 500,
//         height: 500,
//         bgcolor: 'background.paper',
//         border: '2px solid #000',
//         boxShadow: 24,
//         p: 4,
//       };

//     const handleClose = () => {
//         setSelectedItems({})
//       };


//       const [selectedItems, setSelectedItems] = useState<modalLayout>({
//         default: false,
//         error: false,
//         layout: false,
//         loading: false,
//         notFound: false,
//         route: false,
//         template: false,
//       });
    

//     return(
//         <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby='modal-title'
//         aria-describedby='modal-description'
//       >
//         <Box sx={style}>
//           <Typography
//             id='modal-title'
//             variant='h6'
//             component='h2'
//             style={{ marginBottom: 20, fontSize: 30 }}
//           >
//             Choose Your Template Files
//           </Typography>

//           <div>
//             <Checkbox
//               name='default.tsx'
//               checked={selectedItems.default}
//               onChange={handleModalChange}
//             />
//             default.tsx
//           </div>

//           <div>
//             <Checkbox
//               name='error.tsx'
//               checked={selectedItems.error}
//               onChange={handleModalChange}
//             />
//             error.tsx
//           </div>

//           <div>
//             <Checkbox
//               name='layout.tsx'
//               checked={selectedItems.layout}
//               onChange={handleModalChange}
//             />
//             layout.tsx
//           </div>

//           <div>
//             <Checkbox
//               name='loading.tsx'
//               checked={selectedItems.loading}
//               onChange={handleModalChange}
//             />
//             loading.tsx
//           </div>

//           <div>
//             <Checkbox
//               name='notFound.tsx'
//               checked={selectedItems.notFound}
//               onChange={handleModalChange}
//             />
//             notFound.tsx
//           </div>

//           <div>
//             <Checkbox
//               name='route.tsx'
//               checked={selectedItems.route}
//               onChange={handleModalChange}
//             />
//             route.tsx
//           </div>

//           <div>
//             <Checkbox
//               name='template.tsx'
//               checked={selectedItems.template}
//               onChange={handleModalChange}
//             />
//             template.tsx
//           </div>

//           <Button onClick={handleClose} sx={{ mt: 3 }}>
//             Submit
//           </Button>
//         </Box>
//       </Modal>
//     )
// }

// export default Modals;