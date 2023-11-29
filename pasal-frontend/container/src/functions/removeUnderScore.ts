// export const removeUnderScore = (str: string) => {
//     return str.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
// }

export const removeUnderScore = (str:string|undefined) => {
    if(!str) return;
    return str.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
} 