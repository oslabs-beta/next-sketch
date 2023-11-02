import JSZip from 'jszip';
import FileSaver from 'file-saver';
import {Button} from '@mui/material'

const ExportButton = () => {
  async function handleClick(e?: any) {
    try {
      const response = await fetch('http://localhost:3000/export');

      if (!response.ok) {
        // Handle errors, e.g., show an error message
        console.error('Error exporting folder:', response.statusText);
        return;
      }

      const blob = await response.blob();
      // console.log(blob);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'NextSketch.zip';

      // Trigger a click event on the invisible "a" element to prompt the download
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  return (
    <Button className='exportButton' onClick={handleClick} variant="contained"
    color="primary"
    sx={{
      backgroundColor: '#6441A5',
      '&:hover': {
        backgroundColor: '#6441A5',
        fontWeight: 'bold',
        opacity: '0.9'
        // boxShadow: '0 2px 4px rgba(255, 255, 255, 0.2)'

      },
      fontSize: '1.00em',

    }}>
      EXPORT
    </Button>
  );
};

export default ExportButton;
