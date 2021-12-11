import dayjs from "dayjs";



export const humanizeDatetime = (datetime: string) => {
    return dayjs(datetime).fromNow();
}