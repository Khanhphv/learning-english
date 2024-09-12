import axiosClient from "./axiosClient";

export const fetcher = (url: string) => {
    axiosClient.get(url).then((res) => {
        const data = res.data;
        const filteredData = data.values.map((row: any) => row.filter((cell:any) => cell !== ""));
        return filteredData;
    });
}