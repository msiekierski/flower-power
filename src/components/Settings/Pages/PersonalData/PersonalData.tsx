import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  tableFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      '& .MuiButton-root': {
        width: '100%',
      },
    },
  },
  submitButton: {
    whiteSpace: 'nowrap',
    textAlign: 'center',
    width: '25%',
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      width: '100%',
    },
  },
}));

export type PersonalDataRow = {
  title: string;
  value?: string;
};

const PersonalData = () => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const rows: Array<PersonalDataRow> = [
    { title: 'Name', value: 'Jan' },
    { title: 'Surname', value: 'Kowalski' },
    { title: 'Street', value: 'Rynek 15/5' },
    { title: 'City', value: 'Wrocław' },
    { title: 'Zip Code', value: '50-324' },
  ];

  return (
    <>
      <TableContainer>
        <Table>
          <TableBody>
            {rows.map((row, index) => {
              let valueComponent = null;
              if (isEditing) {
                valueComponent = (
                  <TextField
                    variant="standard"
                    margin="none"
                    size="small"
                    fullWidth
                    focused={true}
                    color="secondary"
                    defaultValue={row.value}
                  />
                );
              } else {
                valueComponent = (
                  <Typography style={{ fontWeight: 'bold' }}>
                    {row.value}
                  </Typography>
                );
              }
              return (
                <TableRow key={index}>
                  <TableCell width="50%">
                    <Typography style={{ fontStyle: 'italic' }}>
                      {row.title}
                    </Typography>
                  </TableCell>
                  <TableCell width="50%">{valueComponent}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.tableFooter}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => setIsEditing(!isEditing)}
          className={classes.submitButton}
        >
          {isEditing ? 'Save' : 'Edit Data'}
        </Button>
      </div>
    </>
  );
};

export default PersonalData;