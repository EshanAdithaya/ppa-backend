// firebase.service.ts
import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject 
} from 'firebase/storage';

@Injectable()
export class FirebaseService {
  private storage;

  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyBMNDETMNAzrsUTr-51kG3IO9bG_4wq9a4",
      authDomain: "gymwebapp-23943.firebaseapp.com",
      projectId: "gymwebapp-23943",
      storageBucket: "gymwebapp-23943.appspot.com",
      messagingSenderId: "427856143831",
      appId: "1:427856143831:web:74b6aa8cd9920a8bda1792",
      measurementId: "G-ZGC3Z1PX6D"
    };

    const app = initializeApp(firebaseConfig);
    this.storage = getStorage(app);
  }

  async uploadFile(file: Express.Multer.File): Promise<{ url: string; path: string }> {
    const dateTime = Date.now();
    const storageRef = ref(this.storage, `images/${dateTime}_${file.originalname}`);
    
    await uploadBytes(storageRef, file.buffer);
    const downloadURL = await getDownloadURL(storageRef);

    return {
      url: downloadURL,
      path: storageRef.fullPath,
    };
  }

  async deleteFile(path: string): Promise<void> {
    const storageRef = ref(this.storage, path);
    await deleteObject(storageRef);
  }
}
