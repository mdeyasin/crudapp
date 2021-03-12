import firebase from "firebase/app";
import "firebase/auth";
import Config from '../config/Config';

// Initialize Firebase
class AuthManager{

    constructor(){
        let firebaseConfig = {
            apiKey: Config.firebase.apiKey,
            authDomain: Config.firebase.authDomain,
            databaseURL: Config.firebase.databaseURL,
            projectId: Config.firebase.projectId,
            storageBucket: Config.firebase.storageBucket,
            messagingSenderId: Config.firebase.messagingSenderId,
            appId: Config.firebase.appId,
            measurementId: Config.firebase.measurementId
        };
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth();
        this.googleProvider = new firebase.auth.GoogleAuthProvider();
    }

    /**
     * Auth change observer
     *
     * @param callback
     * @returns {firebase.Unsubscribe}
     */
    onAuthStateChanged = (callback) => this.auth.onAuthStateChanged(callback);

    /**
     * login in firebase
     *
     * @param email
     * @param password
     * @returns {Promise<firebase.auth.UserCredential>}
     */
    signIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);


    /**
     * google login
     *
     * @returns {Promise<firebase.auth.UserCredential>}
     */
    signInWihGoogle = () => {
        return this.auth.signInWithPopup(this.googleProvider);
    };

    /**
     * Register in firebase
     *
     * @param email
     * @param password
     * @returns {Promise<firebase.auth.UserCredential>}
     */
    signUp = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);

    /**
     * log out
     *
     * @returns {Promise<void>}
     */
    signOut = () => this.auth.signOut();

}
let authManager = new AuthManager();
export default authManager;
