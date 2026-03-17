import app from './app';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger Documentation at http://localhost:${PORT}/api-docs`);
});
