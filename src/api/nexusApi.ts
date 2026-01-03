import axios from 'axios';

// Creamos la instancia base de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000', // URL de tu backend NestJS
});

// Definimos las funciones específicas para Nexus English
export const nexusApi = {
  // 1. Obtener la siguiente pregunta según el nivel adaptativo
  getNextQuestion: async (level: string) => {
    const { data } = await api.get(`/ingles/next`, { params: { level } });
    return data;
  },

  // 2. Enviar la respuesta del usuario para validación
  checkAnswer: async (questionId: string, userAnswer: string) => {
    const { data } = await api.post('/ingles/answer', { questionId, userAnswer });
    return data; // Devuelve { isCorrect: boolean, correctAnswer: string }
  },

  // 3. Finalizar el test y actualizar el perfil del Talento en MongoDB Atlas
  finishTest: async (talentoId: string, correctas: number, total: number) => {
    const { data } = await api.post('/ingles/finish', {
      talentoId,
      respuestasCorrectas: correctas,
      totalPreguntas: total,
    });
    return data; // Devuelve el nivel final (B2, C1, etc.)
  },

  // 4. Obtener el último resultado guardado
  getResult: async (talentoId: string) => {
    const { data } = await api.get(`/ingles/result/${talentoId}`);
    return data;
  }
};

export default api;
