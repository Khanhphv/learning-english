import { url } from 'inspector';
import useSWR from 'swr';
import axiosClientForGoogleCloud from './axiosClientForGoogleCloud';


 
export interface TextToSpeechRequest{
    audioConfig:{
        audioEncoding: string;
    };
    input: {
        text: string;
    };
    voice:{
        languageCode: string;
        name: string;
        
    }
}


const TextToSpeechFetcher = async (url: string, params: TextToSpeechRequest) => {

    const response  = await axiosClientForGoogleCloud.post(url,params);
    return response.data;
}

export const useTextToSpeech = (params: TextToSpeechRequest) => {
    const {data, error, mutate} = useSWR(params ? ['/text:synthesize', params] : null, ([url, params]) => TextToSpeechFetcher(url, params), {
        revalidateOnFocus: false,
    });
    console.log(data);
    return{
        audioContent: data?.audioContent,
        isLoading: !error && !data,
        error,
        mutate,
    }
}