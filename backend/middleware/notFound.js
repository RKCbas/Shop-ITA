export const notFoundRoute = (_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
};
