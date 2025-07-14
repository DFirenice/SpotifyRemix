export const getYear = (date: string | Date) => {
    const newDate = new Date(date)
    return newDate.getFullYear()
}