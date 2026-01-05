import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const nexusApi = {
  getNextQuestion: async (level: string) => {
    const { data } = await api.get(`/ingles/next`, { params: { level } });
    return data;
  },

  checkAnswer: async (questionId: string, userAnswer: string) => {
    const { data } = await api.post('/ingles/answer', { questionId, userAnswer });
    return data;
  },

  finishTest: async (talentoId: string, correctas: number, total: number) => {
    const { data } = await api.post('/ingles/finish', {
      talentoId,
      respuestasCorrectas: correctas,
      totalPreguntas: total,
    });
    return data;
  },

  getResult: async (talentoId: string) => {
    const { data } = await api.get(`/ingles/result/${talentoId}`);
    return data;
  },

  // 5. NUEVO: Guardar el nivel calculado directamente (Para tu lógica de 10 preguntas)
  // CORRECCIÓN: Cambiamos la ruta de /auth/results a /ingles/finish
  saveLevel: async (talentoId: string, score: number, level: string) => {
    const { data } = await api.post('/ingles/finish', {
      talentoId,
      respuestasCorrectas: score, // Usamos los nombres que espera tu backend
      totalPreguntas: 10,
      level
    });
    return data;
  }
};

export default api;