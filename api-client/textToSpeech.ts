
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


export const TextToSpeechFetcher = async (url: string, params: TextToSpeechRequest) => {

    const response  = await axiosClientForGoogleCloud.post(url,params);
    return response.data;
}

export const useTextToSpeech = (params: TextToSpeechRequest | null) => {
    const {data, error, mutate} = useSWR(params ? ['/text:synthesize', params] : null, ([url, params]) => TextToSpeechFetcher(url, params), {
        revalidateOnFocus: false,
        dedupingInterval:60* 10 * 1000,
    });
    console.log(data);
    return{
        audioContent: data?.audioContent,
        isLoading: !error && !data,
        error,
        mutate,
    }
}