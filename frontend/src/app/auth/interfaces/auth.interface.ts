export interface AuthResponse {
  mensaje: string;
  token:   string;
  usuario: Usuario;
}

export interface Usuario {
  id:        number;
  nombre:    string;
  email:     string;
  rol:       string;
  telefono:  string|null;
  direccion: string|null;
}
