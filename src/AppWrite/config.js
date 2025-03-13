import { Client, Databases, ID } from "appwrite";
import env from "../ImportEnvs/Envs"

class Service {
    client = new Client();
    // databases = new Databases();
    databases;

    constructor() {
        this.client
        .setEndpoint(env.appwriteUrl) // apan isko ese bhi likh skte hai this.client.setEndpoint() to ye setEndpoint class ke andar ek function hi to bna huwa hai apan usko access kr rhe hai
        // .setEndpoint("https://cloud.appwrite.io/v1") // apan isko ese bhi likh skte hai this.client.setEndpoint() to ye setEndpoint class ke andar ek function hi to bna huwa hai apan usko access kr rhe hai
        .setProject(env.appwriteProjectId);
        this.databases = new Databases(this.client); //  to apan ye new Databases isliye kr rhe hai kyuki wha appwrteite pr Databases ki class ni ui hai to apan ne eccess leliya or uske andar apnne data daldiya
        // this.databases(this.client)  //  to apan ye new Databases isliye kr rhe hai kyuki wha appwrteite pr Databases ki class ni ui hai to apan ne eccess leliya or uske andar apnne data daldiya
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
    

    async addToCart({ productId, prodName, price, category, quantity, discount, ...rest }) {
        try {
            return await this.databases.createDocument(
                env.appwriteDatabaseId,
                env.appwriteCollectionAddToCartId,
                ID.unique(),
                {
                    productId,
                    prodName,
                    price,
                    category,
                    discount
                    // quantity,
                    // ...rest,
                }
                
            );
            console.log("====",prodName);
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





