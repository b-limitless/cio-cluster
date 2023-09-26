export enum formStepEnum {
    one = "one",
    two="two",
    three="three", 
    four="four",
    five="five", 
    six="six", 
    seven="seven",
    eight="eight"
}

export type forStepType = `${formStepEnum}`;

export const formStepArray = Object.values(formStepEnum);
