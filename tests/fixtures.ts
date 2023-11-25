import {BrowserContext, Page, test as base} from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { AppTestData, FrameWorkUtil } from "../utils/frameworkUtil";
import { AppConstants } from "../constants/appConstants";


export const loggedInTests = base.extend<{
    appTestData:AppTestData, 
    loggedInContext:BrowserContext, 
    loggedInPage:Page
}>({

    appTestData: async ({},use)=>{
        const appTestData = FrameWorkUtil.loadAppTestData("stage")
        await use(appTestData)
    },
    page: async({page,appTestData},use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.load()
        await loginPage.doLogin(appTestData.adminUserName,appTestData.admingPasswrd)
        await loginPage.verifyPageHasNavigatedTo(AppConstants.INSTANCE_URL,{
            thresholdTimeout:15000
        })
        await use(page)

    },
    loggedInContext: async({browser},use)=>{
        const context = await browser.newContext({storageState:".auth/credentials.json"})
        await use(context)
        await context.close()
    },
    loggedInPage:async({loggedInContext},use)=>{
        const page = await loggedInContext.newPage()
        await use(page)
        await page.close()
    }
})