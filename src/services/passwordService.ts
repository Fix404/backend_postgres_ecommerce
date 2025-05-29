import bcrypt from 'bcrypt';

const SALT_ROUNDS:number=10;

export const hashPassword = async(password:string):Promise<string>=> {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export const checkPassword=async(passwordInput:string, userPassword:string):Promise<boolean>=>{
    return await bcrypt.compare(userPassword, passwordInput)
}