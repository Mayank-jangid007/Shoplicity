import { Client, Account, Databases, ID } from "appwrite";
import env from "../ImportEnvs/Envs"

class Service {
    client = new Client();
    // databases = new Databases();
    databases;
    account;

    constructor() {
        this.client
        .setEndpoint(env.appwriteUrl) // apan isko ese bhi likh skte hai this.client.setEndpoint() to ye setEndpoint class ke andar ek function hi to bna huwa hai apan usko access kr rhe hai
        // .setEndpoint("https://cloud.appwrite.io/v1") // apan isko ese bhi likh skte hai this.client.setEndpoint() to ye setEndpoint class ke andar ek function hi to bna huwa hai apan usko access kr rhe hai
        .setProject(env.appwriteProjectId);
        this.databases = new Databases(this.client); //  to apan ye new Databases isliye kr rhe hai kyuki wha appwrteite pr Databases ki class ni ui hai to apan ne eccess leliya or uske andar apnne data daldiya
        // this.databases(this.client)  //  to apan ye new Databases isliye kr rhe hai kyuki wha appwrteite pr Databases ki class ni ui hai to apan ne eccess leliya or uske andar apnne data daldiya

        this.account = new Account(this.client)
    }


    async getOrder({productId,quantity,orderDate}) {
        try {
           const response = await this.databases.createDocument( // ye jo databases.createDocument ye ek parameter hai ye apan ko apprite se hi milta hai or isse apan data bhej rhe hai appwrite ko
                env.appwriteDatabaseId, // or ye to jaruri hai hi kyuki isse apan ko pta chal rha hai konsa databse hai
                env.appwriteCollectionOrdersId, // or isse apan ko pta chal rah hai  konsa collection me dalna hahi document  jese apne bna huwe hai na prodcut collection orders users ye sare colelction ahi
                // env.appwriteCollectionProductsId, // or isse apan ko pta chal rah hai  konsa collection me dalna hahi document  jese apne bna huwe hai na prodcut collection orders users ye sare colelction ahi
                ID.unique(), // ye har document(attribute) ke liye ek unique ID generate karega har taki koi duplication issue na ho.
                {            // yha pan data dalna hai jo bhejna chahte hai
                    productId,         
                    quantity,
                    orderDate
                }
            )
            console.log("Document created successfully:", response);
            return response
        }catch(error){
            console.error("Error adding Order:", error);
        }
    }
    

    async addToCart({ productId, prodName, price, images, category, quantity, discount, ...rest }) {
        try {
            // Make sure discount is a valid number between 1 and 100
            let validDiscount = discount;
            
            // If discount includes % sign, remove it
            if (typeof validDiscount === 'string' && validDiscount.includes('%')) {
                validDiscount = validDiscount.replace('%', '');
            }
            
            // Parse to number and ensure it's between 1-100
            validDiscount = parseInt(validDiscount) || 1;
            if (validDiscount < 1) validDiscount = 1;
            if (validDiscount > 100) validDiscount = 100;
            
            
            return await this.databases.createDocument(
                env.appwriteDatabaseId,
                env.appwriteCollectionAddToCartId,
                ID.unique(),
                {
                    productId,
                    prodName,
                    price,
                    category,
                    discount: validDiscount, // Use validated discount
                    images,
                    quantity: quantity || 1, // Default to 1 if not provided
                }
            );
        } catch (error) {
            console.error("Error adding BuyNow:", error);
            console.log("Appwrite URL:", env.appwriteUrl);
            console.log("Appwrite Project ID:", env.appwriteProjectId);
            console.log("Database ID:", env.appwriteDatabaseId);
            console.log("BuyNow Collection ID:", env.appwriteCollectionAddToCartId);
        }
    }

    async fetchBuyNowItems(){
        try{
            const response = await this.databases.listDocuments(
                env.appwriteDatabaseId,
                env.appwriteCollectionAddToCartId,
            )
            console.log("Fetched BuyNow Items:", response.documents);
            return response.documents
        }catch(error){
            console.error("Error adding fetchBuyNowItems:", error);
        }
    }

    async updateCartItem(item) {
        try {
            // First check if item exists
            const existingItems = await this.fetchBuyNowItems()
            const existingItem = existingItems.find(i => i.productId === item.productId)
            
            if (existingItem) {
                // Make sure discount is a valid number between 1 and 100
                let validDiscount = item.discount;
                
                // If discount includes % sign, remove it
                if (typeof validDiscount === 'string' && validDiscount.includes('%')) {
                    validDiscount = validDiscount.replace('%', '');
                }
                
                // Parse to number and ensure it's between 1-100
                validDiscount = parseInt(validDiscount) || 1;
                if (validDiscount < 1) validDiscount = 1;
                if (validDiscount > 100) validDiscount = 100;
                
                // Create a clean object without Appwrite metadata
                const cleanItem = {
                    productId: item.productId,
                    prodName: item.prodName,
                    price: item.price,
                    quantity: item.quantity,
                    discount: validDiscount, // Use validated discount
                    images: item.images
                    // Add any other fields you need to update
                }
                
                return await this.databases.updateDocument(
                    env.appwriteDatabaseId,
                    env.appwriteCollectionAddToCartId,
                    existingItem.$id, // Use the document ID from AppWrite
                    cleanItem
                )
            } else {
                // If item doesn't exist, create it
                return await this.addToCart(item)
            }
        } catch (error) {
            console.error("Error updating cart item:", error)
            throw error
        }
    }

    async createAccount({email, password, name}) {
        let retries = 3;
        while (retries > 0) {
            try {
                const userAccount = await this.account.create(
                    ID.unique(),
                    email,
                    password,
                    name
                );
                return userAccount;
            } catch (error) {
                if (error.code === 429) { // Rate limit error code
                    retries--;
                    if (retries > 0) {
                        // Wait for 2 seconds before retrying
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        continue;
                    }
                }
                throw error;
            }
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }catch(error){
            console.log("login error:", error);
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error) {
            console.log("Get user error:", error);
        }
        return null;
    }

    async logout(){
        try{
            return await this.account.deleteSession('current')
        }catch (error) {
            console.log("Logout error:", error);
        }
    }


}

const service = new Service() // to apnne ye pehle object bnaya fhir export kiya kyuki sidha class ko export krte to wha jake bhi apan ko object bnana pdta hfir apan ye class ke andar wale function ko access kr pate
// service.getOrder()
export default service;

// service.getOrder()
// .then((response) => {
//     console.log("Order created:", response);
// }).catch((error) => {
//     console.error("Error:", error);
// });

// const client = new Client()
//     .setEndpoint(env.appwriteUrl)
//     .setProject(env.appwriteProjectId);

// const databases = new Databases(client); //  to apan ye new Databases isliye kr rhe hai kyuki wha appwrteite pr Databases ki class ni ui hai to apan ne eccess leliya or uske andar apnne data daldiya

// const promise = databases.createDocument( // ye jo databases.createDocument ye ek parameter hai ye apan ko apprite se hi milta hai or isse apan data bhej rhe hai appwrite ko
//     env.appwriteDatabaseId, // or ye to jaruri hai hi kyuki isse apan ko pta chal rha hai konsa databse hai
//     env.appwriteCollectionProductsId, // or isse apan ko pta chal rah hai  konsa collection me dalna hahi document  jese apne bna huwe hai na prodcut collection orders users ye sare colelction ahi
//     ID.unique(), // ye har document(attribute) ke liye ek unique ID generate karega har taki koi duplication issue na ho.
//     {            // yha pan data dalna hai jo bhejna chahte hai
//         ProductName: "Mobile Phone",
//         ProductID: "12345",
//         Price: 15000,
//         IsAvailable: true,
//     } 
// );

// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// });





