import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const codeStation = 'stop_area:SNCF:87611657';

const styles = {
  header: {
    color: 'white',
    borderBottom: 'none',
    height: '4rem !important',
  },
  rows: {
    fontFamily: 'LED BOARD REVERSED',
    fontSize: '.8vw',
    color: '#c2a224',
    borderBottom: 'none',
  },
};

const InfoTrain = () => {
  const [rows, setRows] = useState([]);

  const parseDate = (str) => {
    let obj = {};
    obj.year = str.slice(0, 4);
    obj.month = str.slice(4, 6);
    obj.day = str.slice(6, 8);
    obj.hour = str.slice(9, 11);
    obj.min = str.slice(11, 13);
    obj.sec = str.slice(13, 15);
    return obj;
  };
  useEffect(async () => {
    const response = await axios.get(
      `https://api.sncf.com/v1/coverage/sncf/stop_areas/${codeStation}/departures`,
      { headers: { Authorization: process.env.REACT_APP_API_KEY } }
    );
    console.log('axios response : ', response);

    let arr = [];
    response.data.departures.forEach((el) => {
      const arrival = parseDate(el.stop_date_time.arrival_date_time);
      const departure = parseDate(el.stop_date_time.departure_date_time);
      arr.push({
        departure: `${departure.hour}h${departure.min}`,
        arrival: `${arrival.hour}h${arrival.min}`,
        number: el.display_informations.headsign,
        train: el.display_informations.commercial_mode,
        direction: el.display_informations.direction,
      });
    });
    console.log('result rows : ', response);
    setRows(arr.slice(0, 5));
  }, []);
  return (
    <>
      <h2 className='sncf_title sncf_font'>Trains à l'arrivée</h2>
      <div className='borderBottom' />
      <TableContainer component={Paper} className='tableSncf'>
        <Table sx={{ backgroundColor: 'black' }} size='small'>
          <TableHead sx={{ backgroundColor: 'black', color: 'white' }}>
            <TableRow>
              <TableCell sx={styles.header}></TableCell>
              <TableCell align='left' sx={styles.header}>
                <p className='sncf_header sncf_font'>n°</p>
              </TableCell>
              <TableCell align='left' sx={styles.header}>
                <p className='sncf_header sncf_font'>Heure</p>
              </TableCell>
              <TableCell sx={styles.header} align='left'>
                <p className='sncf_header sncf_font'>Direction</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: 'black' }}>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell sx={styles.rows}>{row.train}</TableCell>
                <TableCell sx={styles.rows}>{row.number}</TableCell>
                <TableCell sx={styles.rows}>{row.departure}</TableCell>
                <TableCell sx={styles.rows}>{row.direction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default InfoTrain;
