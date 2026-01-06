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

  saveLevel: async (talentoId: string, score: number, level: string) => {
    const { data } = await api.post('/ingles/finish', {
      talentoId,
      respuestasCorrectas: score,
      totalPreguntas: 10,
      level
    });
    return data;
  }, // <--- AGREGADA LA COMA AQUÍ

  // Método para el Módulo 3 (Práctica Comunicacional)
  processPractice: async (data: {
    talentoId: string,
    type: string,
    prompt: string,
    userResponse: string,
    cefrLevelAtTime: string
  }) => {
    // Apunta al endpoint validado en Swagger
    const { data: response } = await api.post('/comunicacion/proceso-respuesta', data);
    return response;
  }
};

export default api;