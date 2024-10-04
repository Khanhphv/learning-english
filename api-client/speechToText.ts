import axios from "axios";
import {
  API_KEY_GOOGLE_CLOUD,
  URL_GOOGLE_SPEECH_TO_TEXT,
} from "constants/googleapi";


export interface SpeechToTextRequest {
  audio: {
    content: string; 
  };
  config: {
    encoding: string; 
    languageCode: string;
  };
}


const axiosSpeechToText = axios.create({
  baseURL: URL_GOOGLE_SPEECH_TO_TEXT, 
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: API_KEY_GOOGLE_CLOUD, 
  },
});


export const fetchSpeechToText = async (requestData: SpeechToTextRequest) => {
  try {
    const response = await axiosSpeechToText.post("/v1/speech:recognize", requestData);
    return response.data;
  } catch (error) {
    console.error("Error with Speech-to-Text API:", error);
    throw error;
  }
};
