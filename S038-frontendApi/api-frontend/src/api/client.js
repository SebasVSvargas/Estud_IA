import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

//el interceptor se ejecuta antes de cada solicitud, agregando el token de autenticación a los encabezados si está 
//presente en el almacenamiento local. Esto asegura que todas las solicitudes a la API estén autenticadas correctamente.
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
    }, error => {
        return Promise.reject(error);
});


export default apiClient;
