import { Environment } from "../constants/envConstants"
import appData from "../test-data/appData.json"
export type AppTestData = {
    adminUserName:string,
    admingPasswrd:string
}
export class FrameWorkUtil{
    
    static loadAppTestData(envName:Environment):AppTestData{
        return appData[envName]
    }
}