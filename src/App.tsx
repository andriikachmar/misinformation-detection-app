// App.tsx
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Box, Paper } from '@mui/material';
import { OutlinedInput } from '@mui/material';

function App() {
  const [open, setOpen] = useState(false);
  const [dataDialogOpen, setDataDialogOpen] = useState(false);
  const [date, setDate] = useState('');
  const [language, setLanguage] = useState('');
  const [text, setText] = useState('');

  const [data, setData] = useState<Array<{ date: string, language: string, text: string }>>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAnalyze = () => {
    setData(prevData => [...prevData, { date, language, text }]);
    handleClose();
  };

  const handleDataDialogOpen = () => {
    setDataDialogOpen(true);
  };

  const handleDataDialogClose = () => {
    setDataDialogOpen(false);
  };

  const handleRemove = (index: number) => {
    setData(prevData => prevData.filter((_, i) => i !== index));
  };

  return (
    <div style={{ margin: '20px' }}>
      <Button variant="outlined" onClick={handleClickOpen}>Відкрити діалогове вікно для аналізу тексту</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Система виявлення елементів дезінформації в потоках текстових даних</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mt: 2, mb: 2 }}>
            Оберіть дату, мову та введіть текст для аналізу.
          </DialogContentText>
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
            <TextField
              id="date-input"
              label="Дата"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <FormControl variant="outlined" fullWidth style={{ marginBottom: '20px' }}>
            <InputLabel id="language-label">Мова</InputLabel>
            <Select
              labelId="language-label"
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as string)}
              label="Мова"
              input={<OutlinedInput label="Мова" />}
            >
              <MenuItem value="uk">Українська</MenuItem>
              <MenuItem value="en">Англійська</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="text-input"
            label="Текст"
            placeholder="Введіть текст для аналізу"
            multiline
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Скасувати</Button>
          <Button onClick={handleAnalyze} variant="contained">Аналізувати</Button>
        </DialogActions>
      </Dialog>
      <Button variant="outlined" onClick={handleDataDialogOpen} style={{ marginLeft: '20px' }}>Показати дані</Button>
      <Dialog open={dataDialogOpen} onClose={handleDataDialogClose} fullWidth>
        <DialogTitle>Введені дані для аналізу</DialogTitle>
        <DialogContent>
          {data.map((entry, index) => (
            <Paper elevation={2} style={{ padding: '20px', marginBottom: '20px' }} key={index}>
              <Typography variant="h6" gutterBottom>
                Текст №{index + 1}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Typography variant="body1">
                  <strong>Дата:</strong> {entry.date}
                </Typography>
                <Typography variant="body1">
                  <strong>Мова:</strong> {entry.language === 'uk' ? 'Українська' : 'Англійська'}
                </Typography>
                <Typography variant="body1">
                  <strong>Текст:</strong> {entry.text}
                </Typography>
              </Box>
              <Button variant="contained" color="secondary" onClick={() => handleRemove(index)} style={{ marginTop: '10px' }}>Remove</Button>
            </Paper>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDataDialogClose}>Закрити</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;