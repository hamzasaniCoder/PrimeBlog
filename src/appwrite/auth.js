import conf from "../conf/conf.js";

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client()
    account;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }
    // Sign Up
    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                //Call another method
                return this.login({email,password})
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error
        }
    }
    // Login
    async login({email,password}){
        try {
           return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error;
        }
    }

    // Get current user
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error)
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }


}

const authService = new AuthService();


export default authService

