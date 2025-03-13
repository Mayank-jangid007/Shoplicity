const env = {
    // appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT), // to ye jo hota hai na import.meta.env ye env access kre ka sabka alag alag hota hai to ye import wala access krne ka method vite ka hai create react app ka alag hota hai
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT), // to ye jo hota hai na import.meta.env ye env access kre ka sabka alag alag hota hai to ye import wala access krne ka method vite ka hai create react app ka alag hota hai
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionProductsId: String(import.meta.env.VITE_APPWRITE_COLLECTION_PRODUCTS_ID),
    appwriteCollectionOrdersId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ORDERS_ID),
    appwriteCollectionUsersId: String(import.meta.env.VITE_APPWRITE_COLLECTION_USERS_ID),
    appwriteCollectionAddToCartId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ADDTOCART_ID),
    // appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}
console.log("Appwrite URL:", env.appwriteUrl);
console.log("Project ID:", env.appwriteProjectId);

export default env;